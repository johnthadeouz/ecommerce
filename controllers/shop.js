const Product = require('../models/product');
const Cart = require('../models/cart');


module.exports.getProducts = (request,response)=>{
    Product.fetchAll(products=>{
        response.render('shop/product-list',{
            prods:products, 
            docTitle:'WelcomeToMyShop', 
            path:'/products'
        });
    });
    
};

module.exports.getProduct = (request,response)=>{
    const prodId = request.params.productId;
    Product.fetchById(prodId,product=>{
        //console.log(product);
        response.render('shop/product-detail',{
            product:product, 
            docTitle:product.title, 
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
    Cart.getCart(cart=>{

            Product.fetchAll(products=>{
                const cartProducts = [];
                for(product of products){
                    const cartProduct = cart.products.find(prod=>prod.id===product.id);
                    if(cartProduct){
                        cartProducts.push({productData:product,amount:cartProduct.amount});
                    }
                }
                response.render('shop/cart',{
                    docTitle:'Your Cart',
                    path:'/cart',
                    products:cartProducts,
                    cartTotal:cart.total
                });
            });

    });
};

module.exports.addToCart = (request,response) =>{
    const prodId = request.body.productId;
    Product.fetchById(prodId,(product)=>{
        Cart.addProduct(prodId, product.price);
    });
    response.redirect('/cart');
};

module.exports.getOrders = (request,response) =>{
    response.render('shop/orders',{
        docTitle:'Your Orders',
        path:'/orders'
    });
};

module.exports.getCheckout = (request,response) =>{
    response.render('shop/checkout',{
        docTitle:'Checkout',
        path:'/checkout'
    });
};