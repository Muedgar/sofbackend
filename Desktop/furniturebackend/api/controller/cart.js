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
            /*
            <th style={{paddingLeft: '35px'}} name="product">Product Name</th>
                <th name="price">Price</th>
                <th name="quantity">Quantity</th>
                <th name="customer">Customer Name</th>
                <th name="phone">Customer Phone</th>
            */
           let results = [];
           d.forEach(da => {
            da.orderInfo[0].forEach(daData => {
                let result = [];
                
                result.push(daData.item_img)
                result.push(daData.item_name)
                result.push(daData.item_price)
                result.push(daData.item_quantity)
                result.push(da.orderInfo[1].user)
                result.push(da.orderInfo[1].phone)
                results.push(result)
            })
           })
            res.status(201).json(results)
        }).catch(e => res.status(400).json({message: 'Bad Request'}))
}



module.exports = {
    saveItems,
    getItems
}