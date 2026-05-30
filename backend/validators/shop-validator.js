import z from 'zod';

export const addShopSchema = z.object({
    name: z.string().min(2, "Name must be 2 characters"),
    type: z.array(z.enum(["restaurant", "hotel", "homestay", "cafe"])).min(1, "Shop type is required"),
    address: z.string(),
    description:z.string().optional(),
    thumbnail: z.url("Thumbnail must be url!"),
})

export const updateShopSchema = z.object({
    name: z.string().min(2, "Name must be 2 characters"),
    type: z.array(z.enum(["restaurant", "hotel", "homestay", "cafe"])).min(1, "Shop type is required"),
    address: z.string(),
    description: z.string().optional(),
    thumbnail: z.url("Thumbnail must be url!")
})