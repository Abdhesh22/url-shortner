const express = require("express");
const route = express.Router();
const ShortUrlController = require("../controller/url.controller.js");

route.post("/short-url", ShortUrlController.create);

module.exports = route;
