const Redis = require("ioredis");

// Connect to the Redis Cluster
const redis = new Redis.Cluster([
  { host: "127.0.0.1", port: 7001 },
  { host: "127.0.0.1", port: 7002 },
  { host: "127.0.0.1", port: 7003 },
]);

redis.on("connect", () => {
  console.log("✅ Connected to Redis Cluster");
});

redis.on("error", (err) => {
  console.error("❌ Redis Cluster Error:", err);
});

module.exports = redis;
