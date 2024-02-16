import { z } from "zod";

export const dataSchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "Username es requerido.",
    invalid_type_error: "Username debe ser un string.",
  }),
  password: z.string({
    required_error: "Password es requerido.",
    invalid_type_error: "Password debe ser un string.",
  }),
  email: z
    .string({
      required_error: "Email es requerido.",
      invalid_type_error: "Email debe ser un string.",
    })
    .email(),
  age: z.number({
    required_error: "Age es requerido.",
    invalid_type_error: "Age debe ser un number.",
  }),
  role: z
    .enum(["admin", "user"], {
      invalid_type_error: "Role debe ser un string",
    })
    .default("user"),
});

export type Data = z.infer<typeof dataSchema>;
