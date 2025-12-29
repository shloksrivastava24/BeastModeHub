"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCoreHabits } from "@/server/actions/create-habit";
import { toast } from "sonner";
import { Lock, Target } from "lucide-react";
import { Label } from "@/components/ui/label";

export function CoreHabitForm() {
    const [habits, setHabits] = useState([
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
    ]);
    const [loading, setLoading] = useState(false);

    function hasShortHabitTitle() {
        return habits.some(
            (habit) => habit.title.trim().length > 0 && habit.title.trim().length < 3
        );
    }

    function hasEmptyHabit() {
        return habits.some((habit) => habit.title.trim().length === 0);
    }

    function updateHabit(index: number, value: string) {
        const copy = [...habits];
        copy[index].title = value;
        setHabits(copy);
    }

    async function handleSubmit() {
        if (hasShortHabitTitle()) {
            toast.warning("All habits should be at least 3 characters long.");
            return;
        }
        
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("habits", JSON.stringify(habits));
            await createCoreHabits(formData);
            toast.success("Core habits locked in!");
            window.location.href = "/dashboard";
        } catch (error) {
            toast.error("Failed to save habits. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const filledHabits = habits.filter(h => h.title.trim().length > 0).length;

    return (
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="space-y-3 pb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Define Your Core Habits</CardTitle>
                </div>
                <CardDescription className="text-base">
                    Choose 4 habits you&apos;ll commit to for the next 30 days. Make them specific and achievable!
                </CardDescription>
                
                {/* Progress indicator */}
                <div className="flex items-center gap-2 pt-2">
                    <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-8 rounded-full transition-colors ${
                                    i < filledHabits ? "bg-primary" : "bg-muted"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                        {filledHabits}/4 habits defined
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="space-y-4">
                    {habits.map((habit, index) => (
                        <div key={index} className="space-y-2">
                            <Label htmlFor={`habit-${index}`} className="text-sm font-medium">
                                Habit {index + 1}
                            </Label>
                            <Input
                                id={`habit-${index}`}
                                placeholder={`e.g., ${
                                    index === 0 ? "Exercise for 30 minutes" :
                                    index === 1 ? "Read 10 pages daily" :
                                    index === 2 ? "Meditate for 10 minutes" :
                                    "Drink 8 glasses of water"
                                }`}
                                value={habit.title}
                                onChange={(e) => updateHabit(index, e.target.value)}
                                className="h-11"
                            />
                        </div>
                    ))}
                </div>

                <div className="pt-2">
                    <Button 
                        className="w-full h-12 text-base font-semibold cursor-pointer" 
                        onClick={handleSubmit}
                        disabled={loading || hasEmptyHabit()}
                        size="lg"
                    >
                        {loading ? (
                            "Locking in..."
                        ) : (
                            <>
                                <Lock className="mr-2 h-4 w-4" />
                                Lock in My Habits
                            </>
                        )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-3">
                        <i className="bi bi-lightbulb-fill"></i> These habits will remain locked for 30 days to build consistency
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}