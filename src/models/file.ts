import { z } from "zod";

export const dataSchema = z.object({
  name: z
    .string({
      required_error: "Name es requerido.",
      invalid_type_error: "Name debe ser un string.",
    })
    .min(1, { message: "Name no puede estar vacio" }),
  password: z.string({
    required_error: "Password es requerido.",
    invalid_type_error: "Password debe ser un string.",
  }),
  email: z
    .string({
      required_error: "Email es requerido.",
      invalid_type_error: "Email debe ser un string.",
    })
    .email({ message: "Email invalido" }),
  age: z
    .number({
      required_error: "Age es requerido.",
      invalid_type_error: "Age debe ser un number.",
    })
    .min(1, { message: "La edad debe ser mayor a 0" }),
  role: z
    .enum(["admin", "user"], {
      invalid_type_error: "Role debe ser un string",
    })
    .default("user"),
});

export type Data = z.infer<typeof dataSchema>;
