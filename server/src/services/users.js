require("dotenv").config();
const User = require("../respositories/user");
const UserToken = require("../respositories/user-token");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function login({ username, password }) {
  const data = await all("f_Username = ?", [username]);

  try {
    if (data && Array.isArray(data) && data.length > 0) {
      var users = data;
      var pHash = bcrypt.hashSync(password, users[0].f_Salt);
      if (pHash === users[0].f_Password) {
        const payload = {
          user_id: users[0].Id,
          user_name: users[0].f_Username,
          user_role: users[0].f_Permission === 1 ? "admin" : "user",
        };

        // * CREATE JWT TOKEN
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "15m", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
        });
        // * CREATE JWT REFRESH TOKEN
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
          expiresIn: "1d", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
        });
        users[0].f_Token = token;
        users[0].f_RefreshToken = refreshToken;

        await UserToken.add({ UserId: payload.user_id, Token: refreshToken });
        return Promise.resolve({
          username: users[0].f_Username,
          email: users[0].f_Email,
          isAdmin: users[0].f_Permission === 1 ? true : false,
          accessToken: users[0].f_Token,
          refreshToken: users[0].f_RefreshToken,
        });
      }
    }
  } catch (err) {
    Promise.reject(err);
  }
}

async function verifyToken(token, apiKey) {
  const privateKey = apiKey;

  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, tokenDetails) => {
      if (err) {
        if (err.message === "jwt expired") {
          return reject({ error: true, message: "Token is expired" });
        } else {
          return reject({ error: true, message: "Invalid token" });
        }
      }
      resolve({
        tokenDetails,
        error: false,
        message: "Valid token",
      });
    });
  });
}

async function verifyRefreshToken(refreshToken) {
  const privateKey = process.env.REFRESH_SECRET_KEY;
  const foundUser = await UserToken.getSingle("Token = ?", [refreshToken]);

  return new Promise((resolve, reject) => {
    // Detect refreshToken reused!
    if (!foundUser) {
      jwt.verify(refreshToken, privateKey, async (err, decoded) => {
        if (err) {
          reject({ error: true, message: "Forbidden" });
        }

        const hackedUser = await UserToken.getSingle("UserId = ?", [
          decoded.user_id,
        ]);

        await UserToken.delete(hackedUser?.Id);
      });

      reject({ error: true, message: "Forbidden" });
    }

    jwt.verify(refreshToken, privateKey, async (err, decoded) => {
      if (err || foundUser.UserId !== decoded.user_id) {
        reject({ error: true, message: "Forbidden" });
      }

      const payload = {
        user_id: decoded?.user_id,
        user_name: decoded?.user_name,
        user_role: decoded?.user_role,
      };

      // * CREATE NEW JWT TOKEN
      const newAccessToken = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });

      // * CREATE NEW JWT REFRESH TOKEN
      const newRefreshToken = jwt.sign(
        payload,
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "1d", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
        }
      );

      // Saving refreshToken
      await UserToken.update(foundUser.Id, {
        UserId: foundUser.UserId,
        Token: newRefreshToken,
      });

      return resolve({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
}

async function single(where = "", params = []) {
  return User.getSingle(where, params);
}

async function singleById(id) {
  return User.getSingle(id);
}

async function all(where = "", params = []) {
  return User.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return User.getPage(page, pageSize, where, params);
}

async function insert(data) {
  return User.add(data);
}

async function update(id, data) {
  return User.update(id, data);
}

async function remove(id) {
  return User.delete(id);
}

async function runQuery(sql) {
  return User.runQuery(sql);
}

module.exports = {
  login,
  single,
  singleById,
  all,
  paged,
  insert,
  update,
  remove,
  runQuery,
  verifyToken,
  verifyRefreshToken,
};
