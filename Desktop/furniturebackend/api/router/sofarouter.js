const router = require("express").Router();

const {signup_post,login_post} = require("../controller/authControllers");

const {
    addProduct,
    getAllProducts,
    clearProductsTable,
    updateProduct,
    deleteProduct
} = require("../controller/sofaproducts");

const {
saveItems,
getItems
} = require("../controller/cart");


// products
router.get("/products",getAllProducts);
router.post("/products/add",addProduct);
router.delete("/products/clear",clearProductsTable);
router.delete("/products/delete/:id",deleteProduct)
router.put("/products/update/:id",updateProduct)

// orders 
router.post("/products/order", saveItems);
router.get("/products/order", getItems);

router.get("/", (req,res) => {
    res.status(200).json({
        status: "server is running and ready to receive requests ..."
    })
})

router.post('/signup', signup_post);
router.post('/login', login_post);

module.exports = router;