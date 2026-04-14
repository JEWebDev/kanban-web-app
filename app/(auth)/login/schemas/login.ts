import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Can't be empty")
    .and(z.email("Invalid email address")),
  password: z.string().min(1, "Can't be empty"),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;
