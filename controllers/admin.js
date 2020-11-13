const { request } = require('express');
const Product = require('../models/product');


module.exports.getAddProduct = (request,response)=>{
    
    response.render('admin/edit-product',{
        docTitle:'Add Product', 
        path:'/admin/add-product',
        editing:false,
        product:false
    });

};

module.exports.postAddProduct = (request,response)=>{
    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const description = request.body.description;
    const price = request.body.price;
    const product = new Product(null,title,imageUrl,description,price);
    product.save();
    response.redirect('/');
};

module.exports.getEditProduct = (request,response)=>{
    const editMode = request.query.edit;
    if(!editMode){
        return response.redirect('/');
    }
    const productId = request.params.productId;
    Product.fetchById(productId, product =>{
        if(!product){
            return response.redirect('/');
        }
        response.render('admin/edit-product',{
            docTitle:'Edit Product', 
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        });

    });

};

module.exports.postEditProduct = (request,response)=>{
    const productId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedDescription = request.body.description;
    const updatedImageUrl = request.body.imageUrl;
    const updatedPrice = request.body.price;
    const updatedProduct = new Product(productId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice);
    updatedProduct.save();
    response.redirect('/admin/products')
}

module.exports.postDeleteProduct = (request,response)=>{
    const productId = request.body.productId;
    Product.deleteById(productId);
    response.redirect('/admin/products');
}

module.exports.getProducts = (request,response)=>{
    Product.fetchAll(products=>{
        response.render('admin/products',{
            prods:products, 
            docTitle:'Admin Product List', 
            path:'/admin/products'
        });
    });
};