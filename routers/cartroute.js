const express=require('express');
const { getcart, addtocart, delcartitem } = require('../controllers/cart.controller');
const { verifytoken } = require("../middleware/auth.middleware");
const cartroute=express.Router();
cartroute.use(verifytoken)
cartroute.get('/getcart',getcart)
cartroute.post('/postcart',addtocart);
cartroute.delete('/removeitem',delcartitem)
module.exports={cartroute}