"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { CoreHabitBatchSchema } from "@/lib/db/core-habit.schema";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import clientPromise from "@/lib/db/mongodb";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";

export async function createCoreHabits(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const raw = formData.get("habits");
    if (!raw) throw new Error("No habits provided");

    const habits = JSON.parse(raw as string);

    const parsed = CoreHabitBatchSchema.safeParse(habits);
    if (!parsed.success) {
        throw new Error("You must define exactly 4 core habits");
    }

    await connectDB();
    

    // 🔒 Enforce: no active core habits already
    const activeCount = await CoreHabitModel.countDocuments({
        userId: user._id.toString(),
        isActive: true,
    });

    if (activeCount > 0) {
        throw new Error("Active core habits already exist");
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const docs = parsed.data.map((habit) => ({
        userId: user._id.toString(),
        title: habit.title,
        startDate,
        endDate,
        cycleNumber: 1,
        isActive: true,
    }));

    await CoreHabitModel.insertMany(docs);
}
