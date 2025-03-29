require("dotenv").config();
const express = require("express");

const app = express();
app.use("/", require("./route/index.js"));

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
