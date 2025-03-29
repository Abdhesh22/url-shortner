const ZKClient = require("../../zoo-keeper/zh-client.js");
const UrlService = require("../service/url.service.js");
const RedisService = require("../service/redis.service.js");

const create = async (req, res) => {
  try {
    const { longUrl } = req.body;

    const zkClient = new ZKClient();
    const urlService = new UrlService();
    const redisService = new RedisService();

    const SERVER_NAME = "short-url-server";

    const range = await zkClient.getIDRange(SERVER_NAME);
    console.log(`Range assigned: ${range.start} - ${range.end}`);

    const id = await zkClient.getID(SERVER_NAME);
    const shortUrl = await urlService.base62(id);

    redisService.set(shortUrl, longUrl); //mapping long url to short url

    // res.send({ id });
  } catch (error) {
    console.error("Error generating ID:", error);
    // res.status(500).send({ error: "Failed to generate ID" });
  }
};

const get = async (req, res) => {
  try {
    const { shortUrl } = req.query;

    //first check into cache..
    const redisService = new RedisService();
    const cacheUrl = redisService.get(shortUrl);
    //if cache url found then return else take from dao
    if (cacheUrl) {
      res.status(200).json({ url: cacheUrl });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Occurred While Generating long url" });
  }
};

module.exports = {
  create,
};
