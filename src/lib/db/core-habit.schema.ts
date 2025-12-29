import { z } from "zod";

export const CoreHabitSchema = z.object({
    title: z.string().min(3),
});

export const CoreHabitBatchSchema = z
    .array(CoreHabitSchema)
    .length(4); 

export type CoreHabitInput = z.infer<typeof CoreHabitSchema>;
