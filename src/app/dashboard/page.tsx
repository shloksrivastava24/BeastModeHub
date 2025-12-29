import { getCurrentUser } from "@/lib/auth/current-user";
import { hasIntentionForToday } from "@/lib/db/has-intention";
import { redirect } from "next/navigation";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import mongoose from "mongoose";
import { CoreHabitCard } from "@/components/habits/core-habit-card";
import { CoreHabitLogModel } from "@/lib/db/core-habit-log.model";
import { isCycleComplete } from "@/lib/habits/is-cycle-complete";
import { TodoModel } from "@/lib/db/todo.model";
import { todayString } from "@/lib/todos/today";
import { TodoEditor } from "@/components/todos/todo-editor";
import { isNewDay } from "@/lib/todos/is-new-day";
import { getYesterdayUnfinishedTodos } from "@/server/queries/get-yesterday-unfinished-todos";
import { CarryForwardGate } from "@/components/todos/carry-forward-gate";
import { connectDB } from "@/lib/db/connect";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    if (!user.onboardingcompleted) {
        redirect("/onboarding/archetype");
    }

    const hasIntention = await hasIntentionForToday(user._id);
    if (!hasIntention) redirect("/onboarding/intention");

    await connectDB();
    

    const coreHabits = await CoreHabitModel.find({
        userId: user._id.toString(),
        isActive: true,
    }).lean();

    if (coreHabits.length !== 4) {
        redirect("/onboarding/core-habits");
    }

    const logs = await CoreHabitLogModel.find({
        userId: user._id.toString(),
    });

    const logsByHabit: Record<string, string[]> = {};

    logs.forEach((log) => {
        if (!logsByHabit[log.coreHabitId]) {
            logsByHabit[log.coreHabitId] = [];
        }
        logsByHabit[log.coreHabitId].push(
            new Date(log.date).toISOString().split("T")[0]
        );
    });

    const cycleComplete = coreHabits.every((habit) =>
        isCycleComplete(habit.endDate)
    );

    if (cycleComplete) {
        redirect("/core-habits/review");
    }

    const rawTodos = await TodoModel.find({
        userId: user._id.toString(),
        createdForDate: todayString(),
    }).lean();

    const todos = rawTodos.map((t) => ({
        _id: t._id.toString(),
        title: t.title,
        completed: t.completed,
    }));

    const today = todayString();

    const lastTodo = await TodoModel.findOne({
        userId: user._id.toString(),
        locked: true,
    }).sort({ createdForDate: -1 });

    const newDay = isNewDay(lastTodo?.createdForDate || null, today);

    const unfinishedYesterday = newDay
        ? await getYesterdayUnfinishedTodos(user._id.toString())
        : [];

    return (
        <main className="h-full w-full overflow-y-auto bg-gradient-to-b from-background to-muted/20">
            <CarryForwardGate todos={unfinishedYesterday} />

            <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
                {/* Core Habits Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-primary/20 rounded-full" />
                        <h2 className="text-3xl font-bold text-center">
                            <i className="bi bi-lightning-charge-fill text-primary"></i>{" "}
                            Core Habits
                        </h2>
                        <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-primary/20 rounded-full" />
                    </div>

                    <p className="text-center text-muted-foreground text-sm">
                        30-day cycle • Build consistency, one day at a time
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {coreHabits.map((habit) => (
                            <CoreHabitCard
                                key={habit._id.toString()}
                                id={habit._id.toString()}
                                title={habit.title}
                                startDate={habit.startDate}
                                endDate={habit.endDate}
                                completedDates={
                                    logsByHabit[habit._id.toString()] || []
                                }
                            />
                        ))}
                    </div>
                </section>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Todos Section */}
                <section>
                    <TodoEditor existingTodos={todos} />
                </section>
            </div>
        </main>
    );
}