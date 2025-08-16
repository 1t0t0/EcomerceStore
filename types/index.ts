import z from "zod";
import { insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;  // แก้จาก ratting เป็น rating
  numReviews: number;
  description: string;
  createAt: Date;  // ใช้ createAt ตามที่มีใน database schema
}