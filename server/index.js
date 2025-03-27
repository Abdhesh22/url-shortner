const express = require("express");
const RedisCluster = require("./service/connection/redis-cluster.js");
const app = express();

app.use('/', require("./route/index.js"))

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});