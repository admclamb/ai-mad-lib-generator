const router = require("express").Router();
const controller = require("./generator.controller");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/generate/madlib")
  .post((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.originalUrl}`);
    next();
  }, asyncErrorBoundary(controller.getMadLib))
  .all(methodNotAllowed);

router.all("*", (req, res, next) => {
  console.log(`Received ${req.method} request to ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

module.exports = router;
