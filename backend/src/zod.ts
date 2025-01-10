import { z } from "zod";
export const signupInput = z.object({
  email: z.string().email().min(1),
  username: z.string().min(2),
  password: z.string().min(6),
  name: z.string().optional(),
});
export type signupType = z.infer<typeof signupInput>;
export const signinInput = z.object({
  username: z.string(),
  password: z.string().min(6),
});
export type signinType = z.infer<typeof signinInput>;
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type createBlogType = z.infer<typeof createBlogInput>;
export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});
export type updateBlogType = z.infer<typeof updateBlogInput>;
