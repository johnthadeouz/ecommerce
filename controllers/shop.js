const Product = require('../models/product');


module.exports.getProducts = (request,response)=>{
    Product.fetchAll(products=>{
        response.render('shop/product-list',{
            prods:products, 
            docTitle:'WelcomeToMyShop', 
            path:'/products'
        });
    });
    
};

module.exports.getIndex = (request,response)=>{
    Product.fetchAll(products=>{
        response.render('shop/index',{
            prods:products, 
            docTitle:'Index', 
            path:'/'
        });
    });
};

module.exports.getCart = (request,response) =>{
    response.render('shop/cart',{
        docTitle:'Your Cart',
        path:'/cart'
    });
};

module.exports.getCheckout = (request,response) =>{
    response.render('shop/checkout',{
        docTitle:'Checkout',
        path:'/checkout'
    });
};