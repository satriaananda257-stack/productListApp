# Product Management REST API

REST API sederhana untuk manajemen produk menggunakan Express.js + TypeScript + MySQL + Cloudinary.

## Tech Stack

- Express.js + TypeScript
- MySQL + Drizzle ORM
- JWT Authentication
- Cloudinary (image upload)
- Multer (file handling)
- bcryptjs (password hashing)
- Zod (validation)

## Getting Started

```bash
npm install
npm run dev
```

Server berjalan di `http://localhost:5000`

## Environment Variables

Salin `.env.example` ke `.env` dan isi nilainya:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Auth

| Method | Endpoint | Body | Keterangan |
|--------|----------|------|------------|
| POST | `/api/v1/auth/register` | `username`, `email`, `password` | Daftar akun baru |
| POST | `/api/v1/auth/login` | `email`, `password` | Login, dapat JWT token |

### Products (wajib JWT)

| Method | Endpoint | Body | Keterangan |
|--------|----------|------|------------|
| GET | `/api/v1/products` | — | Ambil semua produk |
| POST | `/api/v1/products` | form-data | Tambah produk baru |

Header untuk endpoint products:
```
Authorization: Bearer <token>
```

#### Body POST /api/v1/products (form-data)

| Key | Type | Wajib | Keterangan |
|-----|------|-------|------------|
| `name` | Text | ✅ | Nama produk |
| `category` | Text | ✅ | Electronics / Clothing / Books / dll |
| `price` | Text | ✅ | Harga (bilangan bulat) |
| `stock` | Text | ✅ | Jumlah stok |
| `description` | Text | ❌ | Deskripsi produk |
| `image` | File | ❌ | Gambar produk (jpg/png/webp, max 5MB) |

#### Kategori yang tersedia

`Electronics`, `Clothing`, `Books`, `Food & Beverage`, `Health & Beauty`, `Sports`, `Home & Living`, `Toys`, `Other`

## Project Structure

```
src/
├── config/
│   ├── schema.ts          — Definisi tabel database
│   ├── db.ts              — Koneksi MySQL
│   ├── cloudinary.ts      — Konfigurasi Cloudinary
│   └── middleware/
│       ├── auth.middleware.ts    — Verifikasi JWT
│       └── upload.middleware.ts  — Upload gambar (Multer)
├── controllers/
│   ├── auth/              — Register & Login
│   └── products/          — CRUD produk
├── routes/
│   ├── auth/
│   └── products/
├── services/
│   └── cloudinary.services.ts
├── validations/
│   ├── auth.validation.ts
│   └── product.validation.ts
└── index.ts
```
