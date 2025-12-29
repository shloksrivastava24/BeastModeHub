"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { connectDB } from "@/lib/db/connect";
import { CoreHabitLogModel } from "@/lib/db/core-habit-log.model";
import mongoose from "mongoose";

export async function completeHabit(coreHabitId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("unauthorized");

    const today = new Date().toISOString().split("T")[0];


    await connectDB();
    
    await CoreHabitLogModel.create({
        coreHabitId,
        userId: user._id.toString(),
        date: today,
    });
}