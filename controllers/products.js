const Product = require('../models/product');

module.exports.getAddProduct = (request,response)=>{
    
    response.render('admin/add-product',{
        docTitle:'Add Product', 
        path:'/admin/add-product',
        isAddProductPage:true
    });

};

module.exports.postAddProduct = (request,response)=>{
    const product = new Product(request.body.title);
    product.save();
    response.redirect('/');
};

module.exports.getProducts = (request,response)=>{
    Product.fetchAll(products=>{
        response.render('shop/product-list',{
            prods:products, 
            docTitle:'WelcomeToMyShop', 
            path:'/', 
            hasProducts:products.length>0,
            isShopPage:true
        });
    });
    
};