import z from "zod"
export const addDestinationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().trim().min(10, "Description must be at least 10 characters").optional(),
    address: z.string().optional(),
    lat: z.coerce.number(),
    long: z.coerce.number(),
    region: z.string().trim().optional(),
    thumbnail: z.string().trim().url("Thumbnail must be a URL").optional()
})  

export const updateDestinationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().trim().min(10, "Description must be at least 10 characters").optional(),
    address: z.string().optional(),
    lat: z.coerce.number(),
    long: z.coerce.number(),
    region: z.string().trim().optional(),
    thumbnail: z.string().trim().url("Thumbnail must be a URL").optional()
})  
