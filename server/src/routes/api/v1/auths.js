require("dotenv").config();
const express = require("express");
const auth_router = express.Router({ mergeParams: true });
const Users = require("../../../services/users");
const UserTokens = require("../../../services/user-tokens");

/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: Authorize API
 */

/**
 * @swagger
 * /api/v1/auths/refresh:
 *   get:
 *     summary: Get Access Token
 *     tags:
 *      - Authorization
 *     security:
 *      - CookieAuth: []
 *     responses:
 *       200:
 *         description: New Access Token
 */
auth_router.get("/refresh", async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).send("Unauthorized");
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    Users.verifyRefreshToken(refreshToken).then(
      ({ accessToken, refreshToken }) => {
        // Create Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return res.status(200).json({
          error: false,
          accessToken: accessToken,
          message: "New Access token created successfully",
        });
      }
    );
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/auths/login:
 *   post:
 *     summary: Login
 *     tags:
 *      - Authorization
 *     security: []
 *     requestBody:
 *       required: true
 *       description: User Login.
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *           examples:
 *             User object example:
 *               sumary: User object example
 *               value: {Username: "UserName", Password: "123456"}
 *     responses:
 *       200:
 *         description: Login success
 */
auth_router.post("/login", async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { Username, Password } = req.body;
    // Make sure there is an Email and Password in the request
    if (!(Username && Password)) {
      return res.status(400).send("All input is required");
    }

    Users.login({ username: Username, password: Password }).then((data) => {
      if (cookies?.jwt) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      }
      // Create Secure Cookie with refresh token
      res.cookie("jwt", data?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        username: data?.username,
        email: data?.email,
        isAdmin: data?.isAdmin,
        accessToken: data?.accessToken,
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/auths/logout:
 *   post:
 *     summary: Logout
 *     tags:
 *      - Authorization
 *     security:
 *      - CookieAuth: []
 *     responses:
 *       200:
 *         description: Logout success
 */
auth_router.post("/logout", async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).send("No Content");
    const refreshToken = cookies.jwt;

    // Is refreshToken in db
    const foundUser = await UserTokens.single("Token = ?", [refreshToken]);
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(204).send("No content");
    }

    // Delete refreshToken in db
    await UserTokens.remove(foundUser.Id);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.status(204).send("No content");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = auth_router;
