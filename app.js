const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');
const CronJob = require('cron').CronJob;
const mongoose = require("mongoose");
const key = dsteem.PrivateKey.fromString('5JrvPrQeBBvCRdjv29iDvkwn3EQYZ9jqfAHzrCyUvfbEbRkrYFC');

const Price = require('./src/db-schema');
const connect = require('./src/connect');

const saveToDB = require('./src/logic').saveToDB;
const getAverage = require('./src/logic').getAverage;
const sendRequest = require('./src/logic').sendRequest;
const createRequestBody = require('./src/logic').createRequestBody;

const job = new CronJob('* * * * * *', async function () {
    const data = await client.database.getCurrentMedianHistoryPrice();
    const price = new Price({
        base: data.base.amount,
        quote: data.quote.amount,
    });
    await saveToDB(price);
    const averageValues = await getAverage(Price);
    const result = createRequestBody(averageValues);
    await sendRequest(result, key, client);
});

job.start();
