const { category } = require("../models/Category");
const Product = require("../models/Product");



exports.postcategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: 'name is req' })
    }
    const exist = await category.findOne({ name })
    if (exist) {
      return res.status(400).json({ msg: "already this category name is exist " })
    }
    const newcat = new category({
      name
    })
    await newcat.save()
    res.status(201).json({ msg: "Category created", category: newcat });
  }
  catch (err) {
    res.status(500).json({ msg: "internal issue while add category", error: err.message })
  }
}

exports.getitembycategorywise = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const product = Product.findOne({ category: categoryId }).populate('category');
    if (!product) {
      res.status(404).json({ msg: "No products in this category" })
    }
    res.status(200).json({ success: true, products });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await category.find();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}