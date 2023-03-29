const Order = require("../model/order");

const saveItems = async (req, res) => {
    await Order.create(req.body)
        .then(d => {
            res.status(201).json({message: 'order saved'})
        }).catch(e => res.status(400).json({message: 'Bad Request'}))
}

const getItems = async (req, res) => {
    await Order.find({})
        .then(d => {
            res.status(201).json(d)
        }).catch(e => res.status(400).json({message: 'Bad Request'}))
}



module.exports = {
    saveItems,
    getItems
}