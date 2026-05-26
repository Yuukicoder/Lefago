import z from 'zod';
export const addImageDestinationSchema = z.object({
    type: z.enum(["image", "video"]).default("image"),
    url: z.string().url("Media URL must be valid"),
})