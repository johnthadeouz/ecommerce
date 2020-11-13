const express = require('express');

const shopController = require('../controllers/shop.js');

const router = express.Router();

router.get('/',shopController.getIndex); 
router.get('/products',shopController.getProducts); 
router.get('/products/:productId',shopController.getProduct); 
router.get('/cart',shopController.getCart); 
router.post('/cart',shopController.addToCart); 
router.post('/cart-delete-product',shopController.postDeleteCartProduct);
router.get('/orders',shopController.getOrders); 
router.get('/checkout',shopController.getCheckout); 

module.exports = router;