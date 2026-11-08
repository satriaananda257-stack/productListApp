import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth/auth.route";
import productsRoute from "./routes/products/products.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productsRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
