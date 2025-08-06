import ProductSchema from "../models/product.model.js"
export async function InsertProducts(req,res){
    try {
    const newProduct = new ProductSchema({
      title: req.body.title,
      description: req.body.description,
      price:req.body.price,
      image_url:req.body.image_url,
      inStock:req.body.inStock,
      rating:req.body.rating
    });
    await newProduct.save();
    res.status(201).send('Item added successfully');
  } catch (error) {
    res.status(500).send('Error adding item');
  }
}

export async function GetProducts(req,res){
  try{
    let AllProducts= await ProductSchema.find()
    
    res.send(AllProducts)
  }
  catch{
    res.status(500)
  }
}

export async function GetSingleProduct(req,res){
  try{
    let product =await ProductSchema.findById(req.params.id);
    if(!product){
      res.status(400).json({"message":"product does not exist"})
    }
    res.send(product)

  }
  catch(err){
    console.error("Error in GetSingleProduct:", err);
    res.status(500).json({"message":" product id not found"})
  }
}