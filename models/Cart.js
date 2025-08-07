
const moongoese = require('mongoose');
const cartschema = new moongoese.Schema({
    user: {
        type: moongoese.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [
        {
            product: {

                type: moongoese.Schema.Types.ObjectId,
                ref: 'Product',
                required: true

            },
            qty: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
})
const cart=moongoese.model('Cart',cartschema)
module.exports={cart}