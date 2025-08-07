const { upload } = require("../middleware/multerupload");
const Product = require("../models/Product");
const { user } = require("../models/user");


exports.getproduct = async (req, res) => {
    try {
        const fetchproduct = await Product.find();
        if (!fetchproduct.length === 0) {
            return res.status(404).json({ msg: "no product" })
        }
        res.status(200).json({ product: fetchproduct })
    }
    catch (err) {
        res.status(500).json({ msg: "inter issue", error: err })
    }
}
// exports.postproduct = upload.array('images', 5), async (req, res) => {
//     try {
//         const { name, price, category, description, stock, attributes } = req.body;
//         const imagemap = req.files.map(file => file.path)
//         const productdata = await new Product({
//             name, price, category, description, stock, attributes, images: imagemap
//         })
//         if (!productdata) {
//             return res.status(400).json({ msg: "fill all the field" })

//         }
//         await productdata.save();
//         res.status(201).json({ msg: "product add successfully" })
//     }
//     catch (err) {
//         res.status(500).json({ msg: "internal issue while adding the product", error: err })
//     }
// }
exports.postproduct = [
  upload.array('images', 5),
  async (req, res) => {
    try {
      const { name, price, category, description, stock, attributes } = req.body;
      const imagemap = req.files.map(file => file.path);

      const productdata = new Product({
        name,
        price,
        category,
        description,
        stock,
        attributes:JSON.parse(attributes || '{}'),
        images: imagemap
      });

      if (!productdata) {
        return res.status(400).json({ msg: "fill all the field" });
      }

      await productdata.save();
      res.status(201).json({ msg: "product add successfully" });

    } catch (err) {
      res.status(500).json({ msg: "internal issue while adding the product", error: err.message });
    }
  }
];

exports.getfvtbyuser = async (req, res) => {
    try {
        const userid = req.user._id;
        if (!userid) {
            return res.status(404).json({ msg: "none! user is not found" })

        }
        const getfvtlist = await user.findById(userid).populate('fav');
        if (getfvtlist.fav.length == 0) {
            return res.status(404).json({ msg: "none! fvt list is empty" })
        }
        res.status(200).json({ msg: "fvt listtt", fvtlist: getfvtlist.fav })
    }
    catch (err) {
        res.status(500).json({ msg: "internal issue which fetch fvt list", error: err })
    }
}
exports.postfvts = async (req, res) => {
    try {
        const { productid } = req.body;
        const userid = req.user._id;
        const userdata = await user.findById(userid);
        if (userdata.fav.includes(productid)) {
            return res.status(400).json({ msg: "already this product in your fvts list" })
        }
        userdata.fav.push(productid);
        await userdata.save();
        res.status(201).json({ msg: "fvt add sucessfull", fvtproduct: userdata.fav })
    }
    catch (err) {
        res.status(500).json({ msg: "internal issue which add fvt list", error: err })
    }
}
exports.delfvts = async (req, res) => {
    try {
        const { productid } = req.body;
        const userid = req.user._id
        const userdata = await user.findById(userid)
        if (!userdata) {
            return res.status(400).json({
                msg: "user is not found"
            })
        }
        userdata.fav = userdata.fav.filter(fvt => fvt != productid);
        await userdata.save()

        res.status(200).json({ msg: "Favorite removed", fav: userdata.fav })
    }
    catch (err) {
        res.status(500).json({ msg: "not remove or internal issue which remove fvt list", error: err })
    }
}
