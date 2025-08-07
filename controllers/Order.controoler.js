const { cart } = require("../models/Cart");
const { Order } = require("../models/Order");

exports.placeorder = async (req, res) => {
    try {
        const { address, phonenumber } = req.body
        const userid = req.user._id;
        const cartdata = await cart.findOne({ user: userid }).populate('items.product');
        if (!cartdata) {
            res.status().json({ msg: 'cart is empty' })
        }
        const items = cartdata.items.map((item) => ({
            product: item.product._id,
            qty: item.qty,
            priceAtTime: item.product.price
        }))
        const totalAmount = items.reduce((acc, item) => acc + (item.qty * item.priceAtTime), 0);
        const neworder = new Order({
            user: userid,
            items,
            totalAmount,
            address,
            phonenumber,
            // status,
            // paymentStatus: "unpaid"
        })
        if (neworder.items.length === 0) {
            return res.status(400).json({ msg: "first select the product" })
        }
        await neworder.save();
        cartdata.items = [];
        await cartdata.save()
        res.status(201).json({ success: true, msg: "order placed sucessfully", order: neworder })


    }
    catch (error) {
        res.status(404).json({ msg: "Sorry !! order is not placed please try again ", err: error.message })

    }
}
exports.vieworderbyadmin = async (req, res) => {
    try {
        const order = await Order.find().populate('user', 'name email').populate('items.product', 'name').sort({ date: -1 })
        res.status(200).json({ success: true, orders: order });

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
exports.updatetheorderstatus = async (req, res) => {
    try {
        const paramsid = req.params.id;
        const { status, paymentstatus } = req.body;
        const updateorder = await Order.findByIdAndUpdate(paramsid, {
            status, paymentstatus
        })
        res.status(200).json({ sucess: true, msg: "update the status sucessfully", update: updateorder })


    }
    catch (err) {
        res.status(500).json({ error: err.message })

    }
}
exports.gettotalsales = async (req, res) => {
    try{
    const getsales = await Order.aggregate([{
        $match: {
            status: 'delivered'
        }
    }, {
        $group: {
            _id: null,
            totalsale: { sum: '$totalAmount' }
        }
    }])
    res.status.json({msg:'total overall sale ',totalsale:getsales[0]?.totalsale || 0})
}
catch(err){
    res.status(500).json({error:err.message})
}
}