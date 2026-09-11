import { z } from "zod";

export const signupSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name must not exceed 50 characters."),

    last_name: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name must not exceed 50 characters."),

    email: z.string().trim().email("Please enter a valid email address."),

    contact_number: z
      .string()
      .trim()
      .min(10, "Please enter a valid contact number.")
      .max(15, "Contact number is too long."),

    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters.")
      .max(255, "Address must not exceed 255 characters."),

    date_of_birth: z.string().min(1, "Please select your date of birth."),

    gender: z.string().min(1, "Please select your gender."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password is too long."),

    confirm_password: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });
