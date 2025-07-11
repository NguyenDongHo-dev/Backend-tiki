const mongoose = require("mongoose");
const { normalizeText } = require("../utils/normalizeText");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
      unique: true,
    },
    image: {
      type: String,
      requied: true,
    },
    type: {
      type: String,
    },
    name_normalized:{
      type:String
    },
    type_normalized:{
      type:String
    },
    price: {
      type: Number,
      requied: true,
    },
    countInStrock: {
      type: Number,
      requied: true,
    },
    rating: {
      type: Number,
      requied: true,
    },
    description: {
      type: String,
      requied: true,
    },
    discount: {
      type: Number,
    },
    selled: {
      type: Number,
    },
  },
  { timestamps: true }
);



productSchema.pre('save', function(next) {
  if (this.name || this.type) {
    this.name_normalized = normalizeText(this.name);
    this.type_normalized = normalizeText(this.type);
  }
  next();
});

productSchema.pre('findByIdAndUpdate', function(next) {
  if (this.name || this.type) {
    this.name_normalized = normalizeText(this.name);
    this.type_normalized = normalizeText(this.type);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
