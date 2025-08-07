const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type:mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  },

  description: {
    type: String,
  },

  images: [String], // Array of image URLs or paths

  stock: {
    type: Number,
    default: 0,
  },

  attributes: {
    type: Map,
    of: String, // or Number/Boolean/Array based on need
    default: {},
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
