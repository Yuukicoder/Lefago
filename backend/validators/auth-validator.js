import z from "zod";
export const registerSchema = z.object({
    fullname: z.string()
    .trim()
      .transform((v) => v.replace(/\s+/g, " "))
  .pipe(z.string().min(2, "Min is 2 characters")),
    email: z.string().email("Invalid email!"),
    password: z.string().trim()
    .min(8, "Min is 8 characters")
    .refine((value) => !/\s/.test(value), {
        message: "Password must not contain spaces"
    }),
    

})

export const loginSchema = z.object({
    email: z.string().email("Invalid email!"),
    password: z.string().min(1, "Password is required")
})