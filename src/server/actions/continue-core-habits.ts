"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import clientPromise from "@/lib/db/mongodb";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { generateCoreHabitReview } from "./generate-core-habit-review";
import { connectDB } from "@/lib/db/connect";

export async function continueCoreHabits() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    await connectDB();
    

    const aiResponse = await generateCoreHabitReview();
    const aiTitles: string[] = aiResponse.suggestedHabits;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    await CoreHabitModel.updateMany(
        { userId: user._id.toString(), isActive: true },
        { isActive: false }
    );

    for (const title of aiTitles) {
        await CoreHabitModel.create({
            userId: user._id.toString(),
            title,
            startDate,
            endDate,
            cycleNumber: 1,
            isActive: true,
        });
    }
    redirect("/dashboard");
}
