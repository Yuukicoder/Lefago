import z from 'zod'
export const verificationSchema = z.object({
    phone: z.string().trim().optional().or(z.literal("")),
    email: z.string().trim().email("Verification email is invalid").optional().or(z.literal("")),
    document_url: z.string().trim().url("Document url is invalid").optional().or(z.literal("")),
    note: z.string().trim().optional().or(z.literal(""))
})

export const createShopRequestSchema = z.object({
    destination_id: z.string().trim().min(1, "Destination is required"),
    name: z.string().trim().min(2, "Shop name must have at least 2 characters"),
    type: z.array(z.enum(["restaurant", "hotel", "homestay", "cafe"]))
    .min(1, "At least one shop type is required"),
    address: z.string().trim().optional().or(z.literal("")),
    description: z.string.trim().optional().or(z.literal("")),
    thumbnail: z.string().trim().url("Thumbnail URL is invalid").optional().or(z.literal("")),
     contact: z.object({
            phoneNumber: z.string().trim().optional().or(z.literal("")),
            email: z.string().trim().email("Invalid contact email").optional().or(z.literal("")),
            facebook: z.string().trim().url("Facebook must be url!").optional().or(z.literal("")), 
            website: z.string().trim().url("Website must be url!").optional().or(z.literal("")),
        }, "Must have contact"
        ),
    verification: verificationSchema
})
export const claimExistingShopSchema = z.object({
    requested_role: z.enum(["owner", "manager"]).default("owner"),
    verification: verificationSchema
})

export const reviewShopClaimSchema = z.object({
    decision: z.enum(["approved", "rejected"]),
    rejection_reason: z.string().trim().optional().or(z.literal(""))
})