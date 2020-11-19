const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundController = require('./controllers/404');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname,'public')));

app.use((request,response,next) => {
    User.findByPk(2)
    .then(user => {
        request.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(notFoundController.pageNotFound);
//users relationships
Product.belongsTo(User);
User.hasMany(Product);
//carts relationships
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart,{through: CartItem});
//orders relationships
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product,{through:OrderItem});
Product.belongsToMany(Order,{through:OrderItem});


sequelize
//.sync({force:true})
.sync()
.then(result=>{
    return User.findByPk(2);
}) 
.then(user =>{
    if(!user){
        User.create({
            name:'Jonatan',
            email:'tadeo.calles@outlook.com'
        });
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(cart =>{
    app.listen(3000);
})
.catch(err=>console.log(err));
