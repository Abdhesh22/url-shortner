const path = require("path");
const mongoose = require("mongoose");
const Schema = require(path.join(
  __dirname,
  "..",
  "..",
  "resources",
  "schemas",
  "url.schema.js"
))(mongoose);

const BaseDao = require("./base.dao.js");

module.exports = class UrlDAO extends BaseDao {
  constructor(connection) {
    super(connection.model("url", Schema));
  }
};
