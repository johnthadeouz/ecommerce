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
    request.user.createProduct({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    })
    .then(result=>{
        console.log(result);
        response.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
};

module.exports.getEditProduct = (request,response)=>{
    const editMode = request.query.edit;
    if(!editMode){
        return response.redirect('/');
    }
    const productId = request.params.productId;
    request.user.getProducts({where:{id:productId}})
    //Product.findByPk(productId)
    .then(products =>{
        const product = products[0];
        if(!product){
            return response.redirect('/');
        }
        response.render('admin/edit-product',{
            docTitle:'Edit Product', 
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        });

    })
    .catch(err => console.log(err));

};

module.exports.postEditProduct = (request,response)=>{
    const productId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedDescription = request.body.description;
    const updatedImageUrl = request.body.imageUrl;
    const updatedPrice = request.body.price;
    Product.findByPk(productId)
    .then(product =>{
        product.title = updatedTitle;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        return product.save();
    })
    .then(result => {
        console.log('Updated Product');
        response.redirect('/admin/products')
    })
    .catch(err => console.log(err));
}

module.exports.postDeleteProduct = (request,response)=>{
    const productId = request.body.productId;
    Product.findByPk(productId)
    .then(product =>{
        return product.destroy();
    })
    .then(result => {
        console.log('Product Destroyed');
        response.redirect('/admin/products');
    })

}

module.exports.getProducts = (request,response)=>{
    request.user.getProducts()
    //Product.findAll()
    .then(products=>{
        response.render('admin/products',{
            prods:products, 
            docTitle:'Admin Product List', 
            path:'/admin/products'
        });
    })
    .catch(err=>console.log(err));
};