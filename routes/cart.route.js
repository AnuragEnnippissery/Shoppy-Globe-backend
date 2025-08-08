import { addToCart, decreaseFromCart, getCart, GetCart, removeFromCart } from "../controllers/cart.controller.js";
import { AuthenticateUser } from "../controllers/user.controller.js";

export default function CartRoutes(app){
    //app.get("/cart/:userId",GetCart);
    
    app.post("/api/cart/add",AuthenticateUser,addToCart);
    app.post("/api/cart/decrease",AuthenticateUser,decreaseFromCart);
    app.delete("/api/cart/remove/:productId",AuthenticateUser,removeFromCart);
    app.get("/api/cart/:userId",AuthenticateUser,getCart);
}