import { Response } from "express";
import { AuthRequest } from "../../config/middleware/auth.middleware";
import { createProductSchema } from "../../validations/product.validation";
import { db } from "../../config/db";
import { productsTable } from "../../config/schema";
import { desc, eq } from "drizzle-orm";
import { uploadToCloudinary } from "../../services/cloudinary.services";

export class ProductsController {
    // POST /api/v1/products
    createProduct = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const validated = createProductSchema.parse(req.body);

            let imageUrl: string | null = null;
            let imagePublicId: string | null = null;

            if (req.file) {
                const result = await uploadToCloudinary(req.file.buffer);
                imageUrl = result.secure_url;
                imagePublicId = result.public_id;
            }

            const [inserted] = await db
                .insert(productsTable)
                .values({
                    userId,
                    name: validated.name,
                    category: validated.category,
                    price: validated.price,
                    stock: validated.stock,
                    description: validated.description ?? null,
                    imageUrl,
                    imagePublicId,
                })
                .$returningId();

            const product = await db.query.productsTable.findFirst({
                where: eq(productsTable.id, inserted.id),
            });

            return res.status(201).json({
                success: true,
                message: "Produk berhasil ditambahkan",
                data: { product },
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : String(error),
            });
        }
    };

    // GET /api/v1/products
    getProducts = async (_req: AuthRequest, res: Response) => {
        try {
            const products = await db
                .select()
                .from(productsTable)
                .orderBy(desc(productsTable.createdAt));

            return res.status(200).json({
                success: true,
                message: "Berhasil mengambil data produk",
                data: { products },
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : String(error),
            });
        }
    };
}

export default new ProductsController();
