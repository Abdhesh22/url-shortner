const route = require("express").Router;
const ShortUrlController = require("../controller/shortUrl.controller.js")

route.post("/short-url", ShortUrlController.create);

module.exports = route