"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { connectDB } from "@/lib/db/connect";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import clientPromise from "@/lib/db/mongodb";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function resetCoreHabits() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    await connectDB();
    

    await CoreHabitModel.updateMany(
        { userId: user._id.toString(), isActive: true },
        { isActive: false }
    );
}
