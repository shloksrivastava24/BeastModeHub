import { IntentionModel } from "@/lib/db/intention.model";
import clientPromise from "@/lib/db/mongodb";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";

export async function getTodaysIntention(userId: string) {
    await connectDB();
    

    const today = new Date().toISOString().split("T")[0];

    return IntentionModel.findOne({
        userId,
        date: today,
    });
}
