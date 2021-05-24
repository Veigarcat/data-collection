const redis = require('redis');
require('dotenv').config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require('../configs');

const redisConnect = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
});
redisConnect.on('error', (err) => {
  console.error('REDIS_ERROR: ', err);
});

redisConnect.on('connect', () => {
  console.log(`Connected to Redis`);
});

module.exports = redisConnect;
