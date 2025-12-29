import { z } from "zod";

export const TodoSchema = z.object({
    title: z.string().min(3),
    createdForDate: z.string(), // YYYY-MM-DD
});

export type TodoInput = z.infer<typeof TodoSchema>;
