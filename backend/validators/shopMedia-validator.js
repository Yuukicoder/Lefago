import z from 'zod';
export const addMediaShopSchema = z.object({
    type: z.enum(["image","video"]),
    url: z.string().url("Must be url")
})