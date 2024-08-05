import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const payload = jwt.verify(token!, process.env.JWT_SECRET!);

    if (!payload) throw new Error();

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}
