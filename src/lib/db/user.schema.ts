import {z} from "zod";

export const UserSchema = z.object({
    _id: z.string().optional(),
    email: z.string().email(),
    name: z.string().optional(),
    image: z.string().optional(),

    xp: z.number().default(0),
    level: z.number().default(1),
    archetype: z.enum(["Titan", "Phoenix", "Shadow"]).optional(),
    onboardingcompleted: z.boolean().default(false),
    createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;