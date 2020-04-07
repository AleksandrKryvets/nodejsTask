const saveToDB = price => price.save()
    .then(doc => console.log('Saved', doc))
    .catch(error => console.log(error));

const getAverage = Price => Price.find({}).sort({_id: -1}).limit(12)
    .then(docs => {
        return calcAverage(docs)
    })
    .catch(error => console.log(error));

const sendRequest = (result, key, client) => client.broadcast.json(result, key)
    .then(response => console.log('Sent', response))
    .catch(error => console.log(error));

const createRequestBody = averageValues =>({
    id: Math.random().toString(),
    json: JSON.stringify({
        avrBase: averageValues.avrBase,
        avrQuote: averageValues.avrQuote,
    }),
    required_auths: [],
    required_posting_auths: ['social'],
});

const calcAverage = (array) => {
    const avrBase = array.reduce((sum, item) => sum + +item.base, 0) / array.length;
    const avrQuote = array.reduce((sum, item) => sum + +item.quote, 0) / array.length;
    return {avrBase, avrQuote}
};

module.exports.saveToDB = saveToDB;
module.exports.getAverage = getAverage;
module.exports.sendRequest = sendRequest;
module.exports.createRequestBody = createRequestBody;
