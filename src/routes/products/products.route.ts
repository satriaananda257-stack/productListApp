import { Router } from "express";
import productsController from "../../controllers/products/products.controller";
import { authenticate } from "../../config/middleware/auth.middleware";
import { uploadSingleImage } from "../../config/middleware/upload.middleware";

const router = Router();

// GET all products — protected
router.get("/", authenticate, productsController.getProducts);

// CREATE product — protected + image upload
router.post("/", authenticate, uploadSingleImage, productsController.createProduct);

export default router;
