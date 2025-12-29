import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import clientPromise from "@/lib/db/mongodb";
import mongoose from "mongoose";
import { CoreHabitForm } from "@/components/habits/create-habit-form";
import { connectDB } from "@/lib/db/connect";

export default async function CoreHabitsPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    await connectDB();
    

    const active = await CoreHabitModel.find({
        userId: user._id.toString(),
        isActive: true,
    });

    if (active.length === 4) {
        redirect("/dashboard");
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <CoreHabitForm />
        </main>
    );
}
