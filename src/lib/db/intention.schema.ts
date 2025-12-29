import {z} from "zod";

export const IntentionSchema = z.object({
    userId: z.string(),
    text: z.string().min(3),
    mood: z.enum(["bad", "alright", "good"]),
    energy: z.number().min(1).max(10),
    date: z.string(),
    createdAt: z.date().optional(),
});

export type Intention = z.infer<typeof IntentionSchema>;