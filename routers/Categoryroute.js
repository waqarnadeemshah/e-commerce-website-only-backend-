const express=require('express');
const { getitembycategorywise, getAllCategories, postcategory } = require('../controllers/Category.controller');

const categoryroute=express.Router();


categoryroute.post('/postcategory',postcategory)
categoryroute.get('/getitembycategory',getitembycategorywise);
categoryroute.get('/getallcategory',getAllCategories)
module.exports={categoryroute}