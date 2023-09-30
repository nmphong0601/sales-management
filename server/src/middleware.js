const jwt = require("jsonwebtoken");
const UserServices = require("./services/users");

const authorize = async (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"] || null;
  const apiKey =
    req.body.apiKey || req.query.apiKey || req.headers["x-api-key"] || null;

  if (req.headers.authorization) {
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    const user = await UserServices.login({ username, password });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }

    token = user.accessToken;
  }

  if (!token || !apiKey) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const result = await UserServices.verifyToken(token, apiKey);
    if (result.error !== false) {
      const { user_role } = result.tokenDetails;

      if (
        user_role != "admin" &&
        (req.baseUrl != "/api/v1/products" ||
          (req.baseUrl == "/api/v1/products" && req.method != "GET"))
      ) {
        return res.status(403).send("Access is denied! You have no permission");
      }
    }
  } catch (err) {
    return res.status(401).send(err.message);
  }

  return next();
};

module.exports = authorize;
