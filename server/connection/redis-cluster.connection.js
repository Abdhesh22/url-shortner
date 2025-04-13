const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = process.env

// Connect to the Redis Cluster
const redis = new Redis.Cluster([
  { host: REDIS_HOST, port: REDIS_PORT }
]);

redis.on("connect", () => {
  console.log("✅ Connected to Redis Cluster");
});

redis.on("error", (err) => {
  console.error("❌ Redis Cluster Error:", err);
});

module.exports = redis;
