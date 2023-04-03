const { PORT = 5000 } = process.env;
const mongoose = require("mongoose");
const app = require("./app");
const { getDatabaseUri } = require("./db/config");

mongoose
  .connect(getDatabaseUri())
  .then(() => {
    console.log("DB connection is successful🚀");
  })
  .catch((error) => {
    console.log("💣😑 What Happened");
    console.error(error);
  });

app.listen(PORT, listener);
function listener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
}
