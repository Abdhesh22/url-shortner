const zookeeper = require('node-zookeeper-client');

const ZK_SERVER = 'localhost:2181';
const RANGE_PATH = '/unique-id-service/server-ranges';
const RANGE_SIZE = 100000;

class IDGenerator {
    constructor(serverName) {
        this.serverName = serverName;
        this.client = zookeeper.createClient(ZK_SERVER);
        this.client.connect();
    }

    async getID() {
        let range = await this.getIDRange();
        if (range.nextID > range.end) {
            range = await this.assignNewRange();
        }

        const nextID = range.nextID;
        range.nextID++;

        await this.updateIDRange(range);
        return nextID;
    }

    async getIDRange() {
        return new Promise((resolve) => {
            this.client.getData(`${RANGE_PATH}/${this.serverName}`, async (err, data) => {
                if (err || !data) {
                    return resolve(await this.assignNewRange());
                }
                resolve(JSON.parse(data.toString()));
            });
        });
    }

    async assignNewRange() {
        return new Promise((resolve, reject) => {
            this.client.getChildren(RANGE_PATH, async (err, children) => {
                if (err) return reject(err);

                let highestEnd = 0;
                for (let child of children) {
                    let data = await this.getDataAsync(`${RANGE_PATH}/${child}`);
                    if (data) highestEnd = Math.max(highestEnd, data.end);
                }

                let newRange = {
                    start: highestEnd + 1,
                    end: highestEnd + RANGE_SIZE,
                    nextID: highestEnd + 1
                };

                const path = `${RANGE_PATH}/${this.serverName}`;

                this.client.exists(path, (existsErr, stat) => {
                    if (existsErr) return reject(existsErr);

                    if (stat) {
                        return this.updateIDRange(newRange).then(() => resolve(newRange));
                    }

                    this.client.create(path, Buffer.from(JSON.stringify(newRange)), (createErr) => {
                        if (createErr) return reject(createErr);
                        resolve(newRange);
                    });
                });
            });
        });
    }

    async getDataAsync(path) {
        return new Promise((resolve) => {
            this.client.getData(path, (err, data) => {
                if (err) return resolve(null);
                resolve(JSON.parse(data.toString()));
            });
        });
    }

    async updateIDRange(range) {
        return new Promise((resolve, reject) => {
            this.client.setData(`${RANGE_PATH}/${this.serverName}`, Buffer.from(JSON.stringify(range)), (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = IDGenerator;