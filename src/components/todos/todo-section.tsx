"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTodo } from "@/server/actions/create-todo";
import { toast } from "sonner";

interface Todo {
    _id: string;
    title: string;
    completed: boolean;
}

export function TodoSection({ todos }: { todos: Todo[] }) {
    const [title, setTitle] = useState("");
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (!title.trim()) {
            toast.warning("Please enter a todo");
            return;
        }

        if (todos.length >= 8) {
            toast.warning("Maximum 8 todos per day");
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append("title", title);
            
            const result = await createTodo(formData);
            
            if (result.success) {
                setTitle("");
                toast.success("Todo added!");
            } else {
                toast.error(result.error || "Failed to add todo");
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <h3 className="font-medium">
                    Today&apos;s Todos ({todos.length}/8)
                </h3>
            </CardHeader>

            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a todo"
                        disabled={todos.length >= 8 || isPending}
                    />
                    <Button 
                        type="submit" 
                        disabled={todos.length >= 8 || isPending || !title.trim()}
                        className="cursor-pointer"
                    >
                        {isPending ? "Adding..." : "Add"}
                    </Button>
                </form>

                <div className="space-y-2">
                    {todos.map((todo) => (
                        <div
                            key={todo._id}
                            className="flex items-center gap-2 text-sm"
                        >
                            <Checkbox checked={todo.completed} />
                            <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                                {todo.title}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}