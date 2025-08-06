// models/Cart.js
import mongoose from 'mongoose';
import ProductModel from './product.model.js';
import UserModel from './user.model.js'

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductModel, // Reference to your Product model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel, // Reference to your User model
    required: true,
    unique: true
  },
  items: [CartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
