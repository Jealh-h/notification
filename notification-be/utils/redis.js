const constProper = require('../configs/constans');
const { createClient } = require('redis');
const Redis = require('ioredis');
class RedisClient {
    constructor() {
        this.client = new Redis(6379, "47.99.199.187", {
            password: constProper.REDIS_PASSWORD,
            db: 0
        })
    }
    /**
     * 获取某个key的值
     * @param {string} key 要查询的key关键字
     */
    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value, expiryMode, time) {
        return await this.client.set(key, value, expiryMode, time);
    }
}
const redisClient = new RedisClient();
module.exports = redisClient;
