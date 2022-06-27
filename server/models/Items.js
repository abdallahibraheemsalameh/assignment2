const mongoose = require('mongoose');
const config = require('../db');

const ItemSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const ItemModel = config.items.model('items', ItemSchema);

module.exports = ItemModel;
