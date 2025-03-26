const zookeeper = require('node-zookeeper-client');
const redis = require('redis');

const ZK_SERVER = 'localhost:2181';
const RANGE_PATH = '/unique-id-service/server-ranges';
const RANGE_SIZE = 100000;

class IDGenerator {
    constructor(serverName) {
        this.serverName = serverName;
        this.client = zookeeper.createClient(ZK_SERVER);
        this.redisClient = redis.createClient();
        this.client.connect();
    }

    async getID() {
        const range = await this.getIDRange();
        if (range.nextID > range.end) {
            return await this.assignNewRange();
        }
        const nextID = range.nextID++;
        await this.updateIDRange(range);
        return nextID;
    }

    async getIDRange() {
        return new Promise((resolve, reject) => {
            this.client.getData(`${RANGE_PATH}/${this.serverName}`, (err, data) => {
                if (err || !data) return resolve(this.assignNewRange());
                resolve(JSON.parse(data.toString()));
            });
        });
    }

    async assignNewRange() {
        return new Promise((resolve) => {
            this.client.getChildren(RANGE_PATH, async (err, children) => {
                let highestEnd = 0;
                for (let child of children) {
                    let data = await this.getDataAsync(`${RANGE_PATH}/${child}`);
                    if (data) highestEnd = Math.max(highestEnd, data.end);
                }
                let newRange = { start: highestEnd + 1, end: highestEnd + RANGE_SIZE, nextID: highestEnd + 1 };
                this.client.create(`${RANGE_PATH}/${this.serverName}`, Buffer.from(JSON.stringify(newRange)), () => resolve(newRange));
            });
        });
    }

    async getDataAsync(path) {
        return new Promise((resolve) => {
            this.client.getData(path, (err, data) => resolve(err ? null : JSON.parse(data.toString())));
        });
    }

    async updateIDRange(range) {
        return new Promise((resolve) => {
            this.client.setData(`${RANGE_PATH}/${this.serverName}`, Buffer.from(JSON.stringify(range)), resolve);
        });
    }
}

module.exports = IDGenerator;
