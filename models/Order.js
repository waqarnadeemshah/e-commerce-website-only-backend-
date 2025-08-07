const moongoese = require('mongoose');
const orderschema = new moongoese.Schema({
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

            },
            priceAtTime: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
    , phonenumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentstatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const Order = moongoese.model('Order', orderschema);
module.exports = { Order };