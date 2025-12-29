"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { carryForwardTodo } from "@/server/actions/carry-forward-todo";
import { markYesterdayDone } from "@/server/actions/mark-yesterday-done";
import { dropTodo } from "@/server/actions/drop-todo";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useState } from "react";

export function CarryForwardModal({
    todos,
    open,
    onClose,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    todos: any[];
    open: boolean;
    onClose: () => void;
}) {
    const [processing, setProcessing] = useState<string | null>(null);

    async function handleAction(
        todoId: string,
        action: () => Promise<void>
    ) {
        setProcessing(todoId);
        try {
            await action();
            window.location.reload();
        } catch (error) {
            console.error(error);
            setProcessing(null);
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Unfinished Tasks from Yesterday
                    </DialogTitle>
                    <DialogDescription>
                        What would you like to do with these tasks?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {todos.map((todo) => (
                        <div
                            key={todo._id}
                            className="flex flex-col gap-3 p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <p className="font-medium text-sm">{todo.title}</p>

                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        handleAction(todo._id, () =>
                                            carryForwardTodo(todo._id)
                                        )
                                    }
                                    disabled={processing === todo._id}
                                    className="flex-1 min-w-[100px] cursor-pointer"
                                >
                                    <ArrowRight className="mr-1 h-3 w-3" />
                                    Carry Forward
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                        handleAction(todo._id, () =>
                                            markYesterdayDone(todo._id)
                                        )
                                    }
                                    disabled={processing === todo._id}
                                    className="flex-1 min-w-[100px] cursor-pointer"
                                >
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    Mark Done
                                </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                        handleAction(todo._id, () =>
                                            dropTodo(todo._id)
                                        )
                                    }
                                    disabled={processing === todo._id}
                                    className="hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                >
                                    <X className="mr-1 h-3 w-3" />
                                    Drop
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Button
                    className="mt-4 w-full cursor-pointer"
                    onClick={onClose}
                    size="lg"
                    disabled={processing !== null}
                >
                    Continue to Dashboard
                </Button>
            </DialogContent>
        </Dialog>
    );
}