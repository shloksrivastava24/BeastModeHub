import { connectDB } from "./connect";
import { IntentionModel } from "./intention.model";
import clientPromise from "./mongodb";
import mongoose from "mongoose";

export async function hasIntentionForToday(userId: string) {
    await connectDB();
    

    const today = new Date().toISOString().split("T")[0];

    const found = await IntentionModel.findOne({
        userId,
        date: today,
    });

    return Boolean(found);
}
