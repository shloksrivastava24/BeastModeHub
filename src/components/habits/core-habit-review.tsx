"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { continueCoreHabits } from "@/server/actions/continue-core-habits";
import { resetCoreHabits } from "@/server/actions/reset-core-habits";
import { useEffect, useState } from "react";
import { generateCoreHabitReview } from "@/server/actions/generate-core-habit-review";

interface ReviewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    habits: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logs: any[];
}

export function CoreHabitReview({ habits, logs }: ReviewProps) {
    const [aiData, setAiData] = useState<null | {
        insight: string,
        suggestion: string,
        suggestedHabits: string[],
    }>(null);

    useEffect(() => {
        generateCoreHabitReview().then(setAiData);
    }, []);

    async function handleContinue() {
        await continueCoreHabits();
        window.location.href = "/dashboard";
    }

    async function handleReplace() {
        await resetCoreHabits();
        window.location.href = "/onboarding/core-habits"
    }
    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl">
                    30-Day Core Habit Review
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Let&apos;s review your performance
                </p>
            </CardHeader>

            <CardContent className="space-y-8">
                {!aiData ? (
                    <p className="text-sm text-muted-foreground">Analyzing you data....</p>
                ) : (
                    <div>
                        <h4 className="font-medium">
                            A.I. insight
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {aiData.insight}
                        </p>
                    </div>
                )}
                {/* Current performance */}
                <div className="grid grid-cols-2 gap-2">
                    {habits.map((habit) => {
                        const completedDays = logs.filter(
                            (l) => l.coreHabitId === habit._id.toString()
                        ).length;

                        return (
                            <div
                                key={habit._id.toString()}
                                className="flex items-center justify-between rounded-md border px-4 py-3"
                            >
                                <div className="flex flex-col text-overflow: ellipsis overflow-x-scroll whitespace-nowrap no-scrollbar">
                                    <span className="font-medium">
                                        {habit.title}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <span className="text-lg font-semibold">
                                        {completedDays}
                                    </span>
                                    <span className="ml-1 text-sm text-muted-foreground">
                                        / 30 days
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {aiData && (
                    <div>
                        <h4>
                            A.I. suggested habits for next cycle
                        </h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5">
                            {aiData.suggestedHabits.map((h,i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </div>
                )}


                {/* Actions */}
                <div className="space-y-3 grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={handleReplace}>
                        Replace Habits
                    </Button>
                    <Button
                        className="w-full cursor-pointer"
                        onClick={handleContinue}>
                        Continue with AI suggestions
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
