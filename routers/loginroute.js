const express=require('express');
const { signup, login, regeneraterefreshtoken, logout } = require('../controllers/authentication.controller');
const authrouter=express.Router();
authrouter.post('/signup',signup);
authrouter.post('/login',login);
authrouter.post('/refreshtoken',regeneraterefreshtoken)
authrouter.post('/logout',logout)
module.exports={authrouter}