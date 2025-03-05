import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  notes: z.string().optional(),
});

export const productSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
});

export const invoiceSchema = z.object({
  clientId: z.string(),
  invoiceNumber: z.string(),
  date: z.date(),
  dueDate: z.date(),
  products: z.array(productSchema),
  notes: z.string().optional(),
});

export type Client = z.infer<typeof clientSchema>;
export type Product = z.infer<typeof productSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;