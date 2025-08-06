import Cart from "../models/cart.model.js";

export function GetCart(req,res){
    console.log("cart items")
}
// GET /cart/:userId
export const getCart = async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ userId }).populate('items.productId');
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  res.status(200).json(cart);
};

// POST /cart/add
export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity: 1 }]
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }

  await cart.save();
  const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
  res.status(200).json({ message: "Product added to cart", updatedCart }); //instead of cart
};

// POST /cart/decrease
export const decreaseFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
  } else {
    cart.items.splice(itemIndex, 1); // Remove the item entirely
  }

  await cart.save();
  res.status(200).json({ message: "Product quantity updated", cart });
};

// DELETE /cart/remove
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();

  res.status(200).json({ message: "Product removed from cart", cart });
};
