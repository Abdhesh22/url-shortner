const redis = require("../connection/redis-cluster.connection");

class RedisService {
  async set(key, value) {
    try {
      await redis.set(key, value, "EX", 60 * 60);
    } catch (error) {
      throw error;
    }
  }
  async get(key) {
    try {
      const value = await redis.get(key);
      return value;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RedisService;
