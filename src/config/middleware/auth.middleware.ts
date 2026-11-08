import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Token tidak ditemukan, silakan login" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ success: false, message: "Token tidak valid atau sudah kadaluarsa" });
    }
};
