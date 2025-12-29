"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRepeat, EnvelopeAt } from "react-bootstrap-icons";

export function EmailLoginForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        
        await signIn("email", {
            email, 
            callbackUrl: "/dashboard",
        });
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type= "email"
                required
                placeholder= "Enter your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
            >
                {loading ? (<><ArrowRepeat className="animate-spin"/>sending email</>) : (<><EnvelopeAt className="h-4 w-4"/>continue with email</>)}
            </Button>
        </form>
    );
}

