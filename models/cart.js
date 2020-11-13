const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

module.exports = class Cart{

    static addProduct(id,productPrice){

        fs.readFile(p,(err,fileContent)=>{
            let cart = {products:[],total:0};
            //fetch previous cart
            if(!err){
                cart = JSON.parse(fileContent);
            }
            
            // Analyze cart => find existing products
            const prodAlreadyExistsInIndex = cart.products.findIndex(prod=>prod.id===id);
            const prodAlreadyExists = cart.products[prodAlreadyExistsInIndex];
            let updatedProduct;

            // Add new product / increase by 1
            if(prodAlreadyExists){
                updatedProduct = {...prodAlreadyExists};
                updatedProduct.amount = updatedProduct.amount + 1;
                cart.products = [...cart.products];
                cart.products[prodAlreadyExistsInIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id,amount:1};
                cart.products = [...cart.products , updatedProduct];
            }
            cart.total = cart.total + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err);
            });
        });
    }

};