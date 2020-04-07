const mongoose = require("mongoose");
const connectString = 'mongodb+srv://root:root@cluster-jswf5.mongodb.net/test?retryWrites=true&w=majority';
const connect = mongoose.connect(connectString, { useNewUrlParser: true });
module.exports = connect;