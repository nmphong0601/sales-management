// Create express app
var express = require("express");
var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const cors = require("cors");

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
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          name: "x-access-token",
          in: "header",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./routes/api/v1/*.js", "./routes/api/v2/*.js"],
};
var bodyParser = require("body-parser");
var app = express();

const v1Router = require("./routes/api/v1");

// Server port
var HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// Setting up CORS
app.use(
  express.urlencoded(),
  cors({
    origin: "http://localhost:8000",
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

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

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
