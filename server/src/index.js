// Create express app
var express = require("express");
var fs = require("fs");
var path = require("path");
let http = require("http");
const https = require("https");
var cookieParser = require("cookie-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const v1Router = require("./routes/api/v1");

var key = fs.readFileSync(path.resolve(__dirname, "certs/cert.key"));
var cert = fs.readFileSync(path.resolve(__dirname, "certs/cert.crt"));
const certOptions = {
  key: key,
  cert: cert,
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop Bee Express API with Swagger",
      version: "2.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "NMP",
        url: "https://github.com/nmphong0601",
        email: "nmphong0601@gmail.com",
      },
    },
    servers: [
      {
        url: "/",
      },
    ],
    components: {
      securitySchemes: {
        BasicAuth: {
          type: "http",
          description: "Basic Authorization",
          scheme: "basic",
        },
        ApiKeyAuth: {
          type: "apiKey",
          name: "x-api-key",
          in: "header",
        },
        CookieAuth: {
          type: "apiKey",
          name: "jwt",
          in: "cookie",
        },
      },
    },
    security: [
      {
        BasicAuth: [],
        ApiKeyAuth: [],
      },
    ],
  },
  apis: [
    `./${process.env.ROOT}/routes/api/v1/*.js`,
    `./${process.env.ROOT}/routes/api/v2/*.js`,
  ],
};

const cors = require("cors");
var app = express();

// Setting up CORS
// const whitelist = ["https://localhost:8080"];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // // Only accept whitelist
      // if (whitelist?.includes(origin)) {
      //   return callback(null, true);
      // }

      // callback(new Error("Not allowed by CORS"));

      // Accept all origin
      return callback(null, true);
    },
  })
);

app.use(function (req, res, next) {
  // Allow Origin localhost port 8000
  res.header("Access-Control-Allow-Origin", "https://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }), cors());

app.use(cookieParser());

// Insert here other API endpoints
app.use("/api", v1Router);

//API Docs
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

// Root endpoint
app.get("/", (req, res, next) => {
  res.redirect("/api-docs");
});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});

// Server port
var HTTP_PORT = 8080;
var server = null;

if (process.env.NODE_ENV == "production") {
  server = http.createServer(app);
} else {
  server = https.createServer(certOptions, app);
}

// Start server
server.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

module.exports = server;
