"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { connectDB } from "@/lib/db/connect";
import { IntentionModel } from "@/lib/db/intention.model";
import { IntentionSchema } from "@/lib/db/intention.schema";
import clientPromise from "@/lib/db/mongodb";
import mongoose from "mongoose";

export async function saveDailyIntention(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const data = {
        userId: user._id.toString(),
        text: formData.get("text"),
        mood: formData.get("mood"),
        energy: Number(formData.get("energyLevel")),
        date: new Date().toISOString().split("T")[0],
    };
    console.log(data);

    const parsed = IntentionSchema.safeParse(data);
    if (!parsed.success) {
        throw new Error("invalid intention data");
    }

    await connectDB();
    

    await IntentionModel.create(parsed.data);

    return {success: true};
}