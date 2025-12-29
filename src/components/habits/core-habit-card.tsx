"use client";

import { calculateCompletionProgress, calculateCycleProgress } from "@/lib/habits/calculate-cycle-progress";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { calculateStreak } from "@/lib/habits/calculate-streak";
import { completeHabit } from "@/server/actions/complete-core-habit";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";

interface CoreHabitCardProps {
    id: string,
    title: string,
    startDate: Date,
    endDate: Date,
    completedDates: string[],
}

export function CoreHabitCard({
    id,
    title,
    startDate,
    endDate,
    completedDates,
}: CoreHabitCardProps) {
    const progress = calculateCycleProgress(startDate, endDate);
    const completionProgress = calculateCompletionProgress(completedDates);
    const streak = calculateStreak(completedDates);

    const today = new Date().toISOString().split("T")[0];
    const completedToday = completedDates.includes(today);

    async function handleComplete() {
        await completeHabit(id);
        window.location.reload();
    }

    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold line-clamp-2">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
                {/* Progress Bar Section */}
                <div className="space-y-2">
                    <Progress value={completionProgress.percent} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="font-medium">
                            Day {progress.day}/{progress.totalDays}
                        </span>
                        <span>{progress.remaining} days left</span>
                    </div>
                </div>

                {/* Streak Section */}
                <div className="flex items-center gap-2 py-2 px-3 bg-muted/50 rounded-md">
                    <i className="bi bi-fire text-lg"></i>
                    <span className="text-sm font-semibold">
                        Streak: <span>{streak}</span> {streak === 1 ? 'day' : 'days'}
                    </span>
                </div>

                {/* Action Button - pushed to bottom */}
                <div className="mt-auto">
                    <Button 
                        onClick={handleComplete}
                        disabled={completedToday}
                        variant={completedToday ? "secondary" : "default"}
                        className="w-full cursor-pointer"
                        size="lg"
                    >
                        {completedToday ? (
                            <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Done for Today
                            </>
                        ) : (
                            "Mark as Complete"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}