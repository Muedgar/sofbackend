const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new Schema({
    orderInfo: Object
})

module.exports = mongoose.model("Order", OrderSchema);