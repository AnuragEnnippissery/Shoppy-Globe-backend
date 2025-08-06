//product model
import mongoose from "mongoose";
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  
  title: String,
  description: String,
  price:Number,
  image_url:String,
  inStock:String,
  rating:Number
});

let ProductModel=mongoose.model("product",ProductSchema);
export default ProductModel;


//c8wnN0KZ1Zzh4PoJ
//anuragramesh608