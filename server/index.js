const express = require("express");
const app = express();

app.use('/', require("./route/index.js"))

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});