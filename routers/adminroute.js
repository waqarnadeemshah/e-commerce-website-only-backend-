const express=require('express');
const { updateproduct, delproduct, postproduct, viewlistproduct } = require('../controllers/admin.controller');
const { verifytoken, verifyAdmin } = require('../middleware/auth.middleware');
const adminroute=express.Router();
adminroute.post('/post/product',verifytoken,verifyAdmin,postproduct)
adminroute.get('/view/product',verifytoken,verifyAdmin,viewlistproduct)

adminroute.put('/update/product/:id',verifytoken,verifyAdmin,updateproduct);
adminroute.delete('/delete/product/:id',verifytoken,verifyAdmin,delproduct)
module.exports={adminroute}