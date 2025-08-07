const { upload } = require("../middleware/multerupload");
const Product = require("../models/Product");
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
exports.viewlistproduct = async (req, res) => {
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

exports.updateproduct = async (req, res) => {
    try {
        const paramsid = req.params.id;
        const { name, price, category, description, stock, attributes } = req.body;
        if (!paramsid) {
            return res.status(404).json({ msg: "params id is not found" });

        }
        const updatedproduct = await Product.findByIdAndUpdate(paramsid, {
            name, price, category, description, stock, attributes
        }, { new: true })
        if (!updatedproduct) {
            return res.status(404).json({ msg: "product is not found" });
        }
        res.status(201).json({ msg: "update product sucessfully", updateitem: updatedproduct })
    }
    catch (err) {
        res.status(400).json({ msg: "not updating", error: err })
    }
}
exports.delproduct=async (req,res)=>{
    try{
        const paramsid=req.params.id;
        const productdel=await Product.findOneAndDelete({_id:paramsid});
        if(!productdel){
            return res.status(404).json({msg:"item is not found"})

        }
        res.status(200).json({msg:"del product sucessfully!!!",product_del:productdel})

    }
    catch(err){
        return res.status(404).json({msg:"item is not found or internal issue while deleting a item",error:err})

    }
}