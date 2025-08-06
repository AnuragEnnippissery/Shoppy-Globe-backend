import { GetProducts, GetSingleProduct, InsertProducts } from "../controllers/product.controller.js";

export function Routes(app){
    app.post("/products",InsertProducts)
    app.get("/api/products",GetProducts)
    app.get("/api/products/:id",GetSingleProduct)
}