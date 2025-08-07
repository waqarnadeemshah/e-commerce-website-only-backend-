


const { cart } = require("../models/Cart");

exports.addtocart = async (req, res) => {
  try {
    const userid = req.user._id;
    const { productid, qty } = req.body;

    let cartinfo = await cart.findOne({ user: userid });

    if (!cartinfo) {
      // ✅ Create new cart if not exists
      cartinfo = new cart({
        user: userid,
        items: [{ product: productid, qty }]
      });
    } else {
      // ✅ Check if item exists
      const itemIndex = cartinfo.items.findIndex(item => item.product.equals(productid));

      if (itemIndex > -1) {
        cartinfo.items[itemIndex].qty += qty;
      } else {
        cartinfo.items.push({ product: productid, qty });
      }
    }

    await cartinfo.save(); // ✅ save once only
    res.status(200).json({ success: true, cart: cartinfo }); // ✅ correct var used

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getcart = async (req, res) => {
    try {
        const userid = req.user._id;
        const cartdata = await cart.findOne({ user:userid }).populate('items.product');
        if (!cartdata) {
            res.status(404).json({ msg: "cart has no item" });
        }
        res.status(200).json({ cartdata: cartdata })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
exports.delcartitem = async (req, res) => {
  try {
    const userid = req.user._id;
    const { productid } = req.body;

    const userdata = await cart.findOne({ user: userid });
    if (!userdata) {
      return res.status(404).json({ msg: "Cart not found for user" });
    }

    let itemfound = false;

    userdata.items = userdata.items.filter(item => {
      if (item.product.equals(productid)) {
        itemfound = true;
        if (item.qty > 1) {
          item.qty -= 1;
          return true;
        }
        return false; 
      }
      return true; 
    });

    if (!itemfound) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    await userdata.save(); 
    res.json({ success: true, cart: userdata });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
