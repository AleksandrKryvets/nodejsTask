const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    base: Number,
    quote: Number
});

module.exports = mongoose.model("Price", priceSchema);