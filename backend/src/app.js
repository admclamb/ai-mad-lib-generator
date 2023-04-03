const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const pino = require("pino");
const expressPino = require("express-pino-logger");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const generatorRoute = require("./generator/generator.router");

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

// Middleware
app.use(expressLogger);
app.use(express.json());
app.use(cors());

// Routes
app.use("/", generatorRoute);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
