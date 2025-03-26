const ZKClient = require("../../zoo-keeper/zh-client");

class ShortUrlController {
    static async create(req, res) {
        try {

            console.log("calling")

            const zkClient = new ZKClient();
            const SERVER_NAME = "short-url-server";

            const range = await zkClient.getIDRange(SERVER_NAME);
            console.log(`Range assigned: ${range.start} - ${range.end}`);

            const id = await zkClient.getNextID(SERVER_NAME);
            console.log(`Generated Unique ID: ${id}`);

            // res.send({ id });
        } catch (error) {
            console.error("Error generating ID:", error);
            // res.status(500).send({ error: "Failed to generate ID" });
        }
    }

    static async get(req, res) {
        res.send("Get Short URL");
    }
}

ShortUrlController.create();

module.exports = ShortUrlController;
