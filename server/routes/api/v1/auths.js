require("dotenv").config();
const express = require("express");
const auth_router = express.Router({ mergeParams: true });
const Users = require("../../../services/users");

/**
 * @swagger
 * tags:
 *   name: Authorize
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/v1/auths/token:
 *   get:
 *     summary: Get Access Token
 *     tags:
 *      - Users
 *     parameters:
 *       - in: query
 *         name: refreshToken
 *         schema:
 *           type: string
 *         description: Refresh token
 *     responses:
 *       200:
 *         description: New Access Token
 */
auth_router.get("/token", function (req, res, next) {
  try {
    let refreshToken = req.query.refreshToken;
    Users.verifyRefreshToken(refreshToken).then(({ accessToken }) => {
      res.status(200).json({
        error: false,
        accessToken,
        message: "New Access token created successfully",
      });
    });
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
 *      - Authorize
 *     requestBody:
 *       required: true
 *       description: User object.
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
 *               value: {Username: "User name", Password: "123456"}
 *     responses:
 *       200:
 *         description: The user response
 */
auth_router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    // Make sure there is an Email and Password in the request
    if (!(Username && Password)) {
      res.status(400).send("All input is required");
    }

    Users.login({ username: Username, password: Password }).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = auth_router;
