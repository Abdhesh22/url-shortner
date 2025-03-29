const mongoose = require("mongoose");
const connections = {};
ß;
class DbConnect {
  static getConnection(DB_NAME) {
    if (connections && connections[DB_NAME]) {
      return connections[DB_NAME];
    }
    const connection = mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connections[DB_NAME] = connection;
    return connection;
  }
}

module.exports = DbConnect;
