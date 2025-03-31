const mongoose = require("mongoose");
const connections = {};

class DbConnect {
  static async getConnection(DB_NAME) {
    if (connections && connections[DB_NAME]) {
      return connections[DB_NAME];
    }
    const connection = await mongoose.createConnection(
      `${process.env.DB_URI}${DB_NAME}`
    );
    connections[DB_NAME] = connection;
    return connection;
  }
}

module.exports = DbConnect;
