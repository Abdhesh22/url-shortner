const ZKClient = require("../../zoo-keeper/zh-client.js");
const UrlService = require("../service/url.service.js");
const RedisService = require("../service/redis.service.js");
const DbConnect = require("../connection/database.connection.js");
const UrlDAO = require("../dao/url.dao.js");
const { http } = require("../utilities/constants/http.constants.js");
const message = require("../utilities/messages/reponse-messages.js");
const { SERVER_NAME } = process.env;

const create = async (req, res) => {
  try {
    const { longUrl } = req.body;

    const zkClient = new ZKClient();
    const urlService = new UrlService();
    const redisService = new RedisService();

    const range = await zkClient.getIDRange(SERVER_NAME);
    console.log(`Range assigned: ${range.start} - ${range.end}`);

    const id = await zkClient.getID(SERVER_NAME);
    const shortUrl = await urlService.base62(id);

    const connection = new DbConnect.getConnection("S1");
    const urlDao = new UrlDAO(connection);

    await urlDao.create({
      shortUrl: shortUrl,
      longUrl: longUrl,
    });

    redisService.set(shortUrl, longUrl);
    res.status(http.OK).send({
      status: true,
      shortUrl: shortUrl,
      longUrl: longUrl,
      message: message.url.created,
    });
  } catch (error) {
    res
      .status(http.INTERNAL_SERVER_ERROR)
      .send({ status: false, message: message.server.ERROR });
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
      return res.status(200).json({ url: cacheUrl });
    }

    const connection = new DbConnect.getConnection("S1");
    const urlDao = new UrlDAO(connection);

    const url = await urlDao.findOne(
      {
        shortUrl: shortUrl,
      },
      { longUrl: 1 }
    );

    redisService.set(shortUrl, url.longUrl);
    res.status(http.OK).send({
      status: true,
      shortUrl: shortUrl,
      longUrl: url.longUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Occurred While Generating long url" });
  }
};

module.exports = {
  create,
  get,
};
