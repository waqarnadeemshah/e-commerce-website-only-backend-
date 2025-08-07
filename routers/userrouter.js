const express=require("express");
const { getproduct, postproduct, getfvtbyuser, postfvts, delfvts } = require("../controllers/user.controller");
const { verifytoken } = require("../middleware/auth.middleware");
const userRoute=express.Router()
userRoute.get('/getproduct',verifytoken,getproduct);
userRoute.post('/postproduct',postproduct)
userRoute.get('/getfvtlist',verifytoken,getfvtbyuser);
userRoute.post('/postfvt',verifytoken,postfvts);
userRoute.post('/delfvt',verifytoken,delfvts)
module.exports={userRoute}