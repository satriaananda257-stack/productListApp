import { z } from "zod";

export const PRODUCT_CATEGORIES = [
    "Electronics",
    "Clothing",
    "Books",
    "Food & Beverage",
    "Health & Beauty",
    "Sports",
    "Home & Living",
    "Toys",
    "Other",
] as const;

export const createProductSchema = z.object({
    name: z.string().min(2, "Nama produk minimal 2 karakter").max(255),
    category: z.enum(PRODUCT_CATEGORIES),
    price: z.coerce.number().int().positive("Harga harus bilangan bulat positif"),
    stock: z.coerce.number().int().min(0, "Stok tidak boleh negatif"),
    description: z.string().optional(),
});
