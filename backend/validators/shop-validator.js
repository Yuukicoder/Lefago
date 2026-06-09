import z from 'zod';

export const addShopSchema = z.object({
    name: z.string().min(2, "Name must be 2 characters"),
    type: z.array(z.enum(["restaurant", "hotel", "homestay", "cafe"])).min(1, "Shop type is required"),
    address: z.string(),
    description:z.string().optional(),
    thumbnail: z.url("Thumbnail must be url!"),
    contact: z.object({
        phoneNumber: z.string().trim().optional().or(z.literal("")),
        email: z.string().trim().email("Invalid contact email").optional().or(z.literal("")),
        facebook: z.string().trim().url("Facebook must be url!").optional().or(z.literal("")), 
        website: z.string().trim().url("Website must be url!").optional().or(z.literal("")),
    }, "Must have contact"
    )
})

export const updateShopSchema = z.object({
    name: z.string().min(2, "Name must be 2 characters"),
    type: z.array(z.enum(["restaurant", "hotel", "homestay", "cafe"])).min(1, "Shop type is required"),
    address: z.string(),
    description: z.string().optional(),
    thumbnail: z.url("Thumbnail must be url!"),
     contact: z.object({
        phoneNumber: z.string().trim().optional().or(z.literal("")),
        email: z.string().trim().email("Invalid contact email").optional().or(z.literal("")),
        facebook: z.string().trim().url("Facebook must be url!").optional().or(z.literal("")), 
        website: z.string().trim().url("Website must be url!").optional().or(z.literal("")),
    }
    )
})