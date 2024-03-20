const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  registerDate: {
    type: Date,
    default: Date.now
  },
  item: {
    type: String,
    required: true
  },
  hsn: String,
  quantity: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  expiryDate: Date,
  tax: {
    type: Number,
    required: true
  },
  discount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;
