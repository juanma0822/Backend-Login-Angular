import { Router } from "express";
import { getProducts, registerProduct } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.post("/api/product/register", registerProduct);
router.get("/api/product/allProducts",validateToken, getProducts);


export default router;