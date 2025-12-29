"use client";

import { useState } from "react";
import { CarryForwardModal } from "./carry-forward-modal";

export function CarryForwardGate({
    todos,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    todos: any[];
}) {
    const [open, setOpen] = useState(todos.length > 0);

    if (todos.length === 0) return null;

    return (
        <CarryForwardModal
            open={open}
            todos={todos}
            onClose={() => setOpen(false)}
        />
    );
}
