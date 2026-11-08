import {
    mysqlTable,
    mysqlEnum,
    int,
    varchar,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

// ─── USERS ────────────────────────────────────────────────────
export const usersTable = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ─── PRODUCTS ─────────────────────────────────────────────────
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

export const productsTable = mysqlTable("products", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    category: mysqlEnum("category", PRODUCT_CATEGORIES).notNull(),
    price: int("price").notNull(),
    stock: int("stock").notNull().default(0),
    description: text("description"),
    imageUrl: text("image_url"),
    imagePublicId: varchar("image_public_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
