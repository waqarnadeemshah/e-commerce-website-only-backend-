 E-Commerce Website Backend (Node.js + Express + MongoDB)

This is a complete backend for an e-commerce web application built using Node.js, Express, and MongoDB with Mongoose.

The backend provides all core functionalities like user authentication, product/category management, cart system, order processing, and an aggregation-based sales report.



 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens
- **Multer** (for file uploads)
- bcrypt (for password hashing)
- MongoDB Aggregation Framework



 Key Features

✅ User Authentication  
✅ JWT-based login/signup  
✅ Role-based access (user/admin)  
✅ Product CRUD operations  
✅ Category CRUD operations  
✅ Cart management (Add, Remove, Update)  
✅ Order placement & management  
✅ Delivered orders total sales via aggregation  
✅ MongoDB hybrid data modeling (embedded + references)

--- ├── controllers/
│ └── authtication.controller.js
| └── admin.controller.js
│ └── user.controller.js
│ └── OrderControoler.js
│ └── cart.controller.js
│ └── Category.controller.js
├── models/
│ └── user.js
│ └── Product.js
│ └── Order.js
│ └── Cart.js
│ └── Category.js
├── routes/
│ └── adminroute.js
│ └── userroute.js
│ └── cartroutes.js
│ └── orderroutes.js
│ └── loginroute.js
│ └── category.js
├── middleware/
│ └── auth.middleware.js
│ └── multerupload.js
├── config/
│ └── db.js
├── uploads/
│ └── product-images/
├── .env
├── app.js
├── package.json

## 📁 Project Structure

