const express = require("express");
const route = express.Router();
const UrlController = require("../controller/url.controller.js");

route.post("/url", UrlController.create);
route.get("/url", UrlController.get);

module.exports = route;
