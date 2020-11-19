# nodejs-ecommerce
> Web-based system that can be used to manage and show your products/services on the internet.

# THIS PROJECT INCLUDES THE FOLLOWING DEVELOPMENT TECHNOLOGIES:
> NODEJS/EXPRESS SERVER
> USING OF THE VIEW ENGINE 'EJS' (also using import()/includes to recycle html)
> MVC
> API REST
> Storing/Reading/Modifying information in MYSQL database (using 'Sequelize' ORM)

# API
CRUD

| Endpoint | HTTP | Description |
| -------- | ---- | ----------- |
| '/'                    | GET  | home section. most popular products, newest products, catalogs, rating of our clients, blog entries.|
| '/products'            | GET  | Retrieve a list of all the products |
| '/products/:productId' | GET  | Complete information about an specific product |
| '/cart'                | GET  | shopping cart being used by the user. |
| '/cart'                | POST | Add a product to the existing shopping cart. |
| '/orders'              | GET  | Display the client's order history |
| '/checkout'            | GET  | The flow needed to be followed by the client in order to make a purchase| 
| '/admin/add-product'   | GET  | Display a form that need to be filled before creating a new product |
| '/admin/add-product'   | POST | Add new product into the e-Commerce using the information of the form |
| '/admin/products'      | GET  | Product list with admin features. |

## LICENCE
MIT (c) Kymelion Entertainment