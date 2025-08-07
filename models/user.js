const moongoese = require('mongoose')
const userschema = moongoese.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    ,
    fav: [{
        type: moongoese.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})
const user=moongoese.model('user',userschema);
module.exports={user}