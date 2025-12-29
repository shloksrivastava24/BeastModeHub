"use client";

import { useState, useOptimistic, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { saveDailyTodos } from "@/server/actions/save-daily-todos";
import { generateTodoSuggestions } from "@/server/actions/generate-todo-suggestions";
import { toggleTodo } from "@/server/actions/toggle-todos";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Lock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Todo = {
    _id: string;
    title: string;
    completed: boolean;
};

export function TodoEditor({ existingTodos }: { existingTodos: Todo[] }) {
    const locked = existingTodos.length === 8;
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [todos, setTodos] = useState<string[]>(
        locked ? existingTodos.map((t) => t.title) : Array(8).fill("")
    );

    // Optimistic state for todo completion
    const [optimisticTodos, setOptimisticTodos] = useOptimistic(
        existingTodos,
        (state, todoId: string) => {
            return state.map((todo) =>
                todo._id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        }
    );

    function updateTodo(index: number, value: string) {
        if (locked) return;
        const copy = [...todos];
        copy[index] = value;
        setTodos(copy);
    }

    async function handleAISuggest() {
        try {
            setLoading(true);
            const suggestions = await generateTodoSuggestions();
            setTodos(suggestions);
            toast.success("AI suggestions generated!");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Failed to generate suggestions");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        if (todos.some((t) => t.trim() === "")) {
            toast.warning("All 8 todos must be filled");
            return;
        }
        try {
            setLoading(true);
            const result = await saveDailyTodos(todos);

            if (result.success) {
                toast.success("Todos locked in!");
                window.location.reload();
            } else {
                toast.error(result.error || "Failed to save todos");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Failed to save todos");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleToggle(todoId: string) {
        // Optimistically update UI
        startTransition(() => {
            setOptimisticTodos(todoId);
        });

        // Perform actual update
        try {
            const result = await toggleTodo(todoId);

            if (!result.success) {
                toast.error(result.error || "Failed to update todo");
                // Revert optimistic update on error
                window.location.reload();
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Failed to update todo");
            window.location.reload();
        }
    }

    const filledTodos = todos.filter((t) => t.trim().length > 0).length;
    const completedTodos = locked
        ? optimisticTodos.filter((t) => t.completed).length
        : 0;

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <Card>
                <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            {locked ? (
                                <>
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    Today&apos;s 8 Todos
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-clipboard2-check"></i> Plan Your Day
                                </>
                            )}
                        </CardTitle>

                        {!locked && (
                            <Button
                                variant="outline"
                                onClick={handleAISuggest}
                                disabled={loading}
                                className="gap-2 cursor-pointer"
                            >
                                <Sparkles className="h-4 w-4" />
                                {loading ? "Generating..." : "AI Suggest"}
                            </Button>
                        )}
                    </div>

                    {locked && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Progress Today</span>
                                <span className="font-medium">
                                    {completedTodos}/{optimisticTodos.length} completed
                                </span>
                            </div>
                            <Progress
                                value={(completedTodos / optimisticTodos.length) * 100}
                                className="h-2"
                            />
                        </div>
                    )}

                    {!locked && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex gap-1">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 w-6 rounded-full transition-colors ${i < filledTodos
                                                ? "bg-primary"
                                                : "bg-muted"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="font-medium">
                                {filledTodos}/8 todos planned
                            </span>
                        </div>
                    )}
                </CardHeader>

                <CardContent className="space-y-3">
                    {locked ? (
                        // Locked todos with optimistic updates
                        optimisticTodos.map((todo, i) => (
                            <div
                                key={todo._id}
                                className="flex items-center gap-3 group"
                            >
                                <span
                                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium flex-shrink-0 ${todo.completed
                                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {i + 1}
                                </span>

                                <Input
                                    value={todo.title}
                                    readOnly
                                    className={`flex-1 ${todo.completed
                                            ? "line-through text-muted-foreground"
                                            : ""
                                        }`}
                                />

                                <Checkbox
                                    checked={todo.completed}
                                    onCheckedChange={() => handleToggle(todo._id)}
                                    disabled={isPending}
                                    className="flex-shrink-0 cursor-pointer"
                                />
                            </div>
                        ))
                    ) : (
                        // Editable todos
                        todos.map((todo, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 group"
                            >
                                <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium flex-shrink-0 bg-muted text-muted-foreground">
                                    {i + 1}
                                </span>

                                <Input
                                    value={todo}
                                    onChange={(e) => updateTodo(i, e.target.value)}
                                    placeholder={`Todo ${i + 1}`}
                                    className="flex-1"
                                />
                            </div>
                        ))
                    )}

                    {!locked && (
                        <Button
                            className="w-full mt-6 cursor-pointer"
                            onClick={handleSave}
                            disabled={loading || filledTodos < 8}
                            size="lg"
                        >
                            <Lock className="mr-2 h-4 w-4" />
                            {loading ? "Locking..." : "Lock Today's Todos"}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}