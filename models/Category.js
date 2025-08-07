const moongoese=require("mongoose");
const categoryschema=new moongoese.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
})
const category=moongoese.model('Category',categoryschema);
module.exports={category}