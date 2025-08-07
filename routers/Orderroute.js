const express=require('express');
const { verifytoken, verifyAdmin } = require('../middleware/auth.middleware');
const { placeorder, vieworderbyadmin, updatetheorderstatus, gettotalsales } = require('../controllers/Order.controoler');
const orderroute=express.Router();
orderroute.use(verifytoken);
orderroute.post('/placeorder',placeorder)
orderroute.get('/viewplaceorder',verifyAdmin,vieworderbyadmin)
orderroute.put('/updatestatus/:id',verifyAdmin,updatetheorderstatus)
orderroute.get('/gettotalsale',verifyAdmin,gettotalsales)
module.exports={orderroute}