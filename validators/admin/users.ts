import { z } from "zod";

export const adminCreateUserValidator = z.object({
  first_name: z.string().min(3, "First name must be at least 3 characters."),

  last_name: z.string().min(3, "Last name must be at least 3 characters."),

  email: z.email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be less than 64 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character.",
    ),

  contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number.",
    ),

  role_id: z
    .number()
    .int()
    .refine((value) => value === 1 || value === 2, {
      message: "Role must be either Admin or User.",
    }),

  date_of_birth: z
    .string()
    .regex(
      /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      "Date of birth must be in YYYY/MM/DD format.",
    )
    .refine((value) => {
      const [year, month, day] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Date of birth must be a valid date.")
    .refine((value) => {
      const [year, month, day] = value.split("/").map(Number);

      return new Date(year, month - 1, day) <= new Date();
    }, "Date of birth cannot be in the future."),

  address: z.string().trim().max(500, "Address cannot exceed 500 characters."),

  gender: z.string().trim().max(20, "Gender cannot exceed 20 characters."),

  emergency_contact: z
    .string()
    .trim()
    .max(150, "Emergency contact cannot exceed 150 characters.")
    .optional(),

  emergency_contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Emergency contact number must be a valid Philippine mobile number.",
    )
    .optional(),
});
