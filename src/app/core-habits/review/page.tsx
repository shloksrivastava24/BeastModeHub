import { CoreHabitReview } from "@/components/habits/core-habit-review";
import { getCurrentUser } from "@/lib/auth/current-user";
import { connectDB } from "@/lib/db/connect";
import { CoreHabitLogModel } from "@/lib/db/core-habit-log.model";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export default async function CoreHabitReviewPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    await connectDB();
    

    const rawHabits = await CoreHabitModel.find({
        userId: user._id.toString(),
        isActive: true,
    }).lean();
    const rawLogs = await CoreHabitLogModel.find({
        userId: user._id.toString(),
    }).lean();

    const habits = rawHabits.map((h) => ({
        _id: h._id.toString(),
        title: h.title,
        startDate: h.startDate?.toISOString(),
        endDate: h.endDate?.toISOString(),
        cycleNumber: h.cycleNumber,
        isActive: h.isActive,
    }));

    const logs = rawLogs.map((l) => ({
        _id: l._id.toString(),
        coreHabitId: l.coreHabitId.toString(),
        date: new Date(l.date).toISOString(),
    }));

    if (habits.length !== 4) {
        redirect("/dashboard");
    }

    const today = new Date();

    const allHabitsStillActive = habits.every((habit) => {
        if (!habit.endDate) return false;

        const endDate = new Date(habit.endDate);
        return endDate > today;
    });


    {/*if (allHabitsStillActive) redirect("/dashboard");*/}

        return (
            <main className="min-h-screen flex items-center justify-center p-6">
                <CoreHabitReview habits={habits} logs={logs} />
            </main>
        );
}