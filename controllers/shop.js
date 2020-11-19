const Product = require('../models/product');


module.exports.getProducts = (request,response)=>{
    Product.findAll()
    .then(products=>{
        response.render('shop/product-list',{
            prods:products,
            docTitle:'WelcomeToMyShop',
            path:'/products'
        });
    })
    .catch(err=>console.log(err));
    
}; 

module.exports.getProduct = (request,response)=>{
    const prodId = request.params.productId;
    
    Product.findByPk(prodId)
    .then(product=>{
        //console.log(product[0].title);
        response.render('shop/product-detail',{
            product:product, 
            docTitle:product.title, 
            path:'/products'
            });
    })
    .catch(err=>console.log(err)); 
    
    
};

module.exports.getIndex = (request,response)=>{
    Product.findAll()
    .then(products=>{
        response.render('shop/index',{
            prods:products, 
            docTitle:'Index', 
            path:'/'
        });
    })
    .catch(err=>console.log(err));
};

module.exports.getCart = (request,response) =>{
    /*Cart.getCart(cart=>{

            Product.fetchAll()
            .then(([rows,fieldData])=>{
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
            })
            .catch(err=>console.log(err));

    });*/
    request.user.getCart()
    .then(cart=>{
        return cart.getProducts()
        .then(products => {
            response.render('shop/cart',{
                docTitle:'Your Cart',
                path:'/cart',
                products:products,
                cartTotal:0
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports.addToCart = (request,response) =>{
    const prodId = request.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    request.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where:{id:prodId}});
    })
    .then(products=>{
        let product;
        if(products.length > 0){
            product = products[0];
        }
        if(product){
            const oldProductQuantity = product.cartItem.quantity;
            newQuantity = oldProductQuantity + 1;
            return product;
        }
        return Product.findByPk(prodId);
    })
    .then(product => {
        return fetchedCart.addProduct(product,{
            through:{quantity:newQuantity}
        });
    })
    .then(()=>{
        response.redirect('/cart');
    })
    .catch(err=>console.log(err));
    
};

module.exports.postDeleteCartProduct = (request,response)=>{
    const productId = request.body.productId;
    request.user.getCart()
    .then(cart => {
        return cart.getProducts({where:{id:productId}})
    })
    .then(products=>{
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result=>{
        response.redirect('/cart');
    })
    .catch(err=>console.log(err));

};

module.exports.postOrder = (request,response,next) => {
    
    let fetchedCart;

    request.user.getCart()
    .then(cart=>{
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products=>{
        return request.user.createOrder()
        .then(order=>{
            return order.addProducts(products.map(product=>{
                product.orderItem = {quantity: product.cartItem.quantity};
                return product;
            }));
        })
        .catch(err=>console.log(err));
    })
    .then(result=>{
        return fetchedCart.setProducts(null);
    })
    .then(result=>{
        response.redirect('/orders');
    })
    .catch(err=>console.log(err));
};

module.exports.getOrders = (request,response) =>{
    request.user.getOrders({include:['products']})
    .then(orders=>{

        response.render('shop/orders',{
            docTitle:'Your Orders',
            path:'/orders',
            orders:orders
        });
    })
    .catch(err=>console.log(err));
};

module.exports.getCheckout = (request,response) =>{
    response.render('shop/checkout',{
        docTitle:'Checkout',
        path:'/checkout'
    });
};