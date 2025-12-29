"use client";

import { Archetype } from "@/lib/onboarding/archetype-questions";
import { saveArchetype } from "@/server/actions/save-archetype";
import { Button } from "../ui/button";

interface ResultProps {
    archetype: Archetype;
}

export function ArchetypeResult({ archetype }: ResultProps) {
    async function handleContinue() {
        await saveArchetype(archetype);
        window.location.href = "/dashboard";
    }
    return (
        <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold">
                You are a {archetype} 
            </h1>

            <p className="text-muted-foreground">
                {archetype === "Titan" &&
                    "You thrive on structure, intensity, and dominance."}
                {archetype === "Phoenix" &&
                    "You rise stronger after every setback."}
                {archetype === "Shadow" &&
                    "You master focus, silence, and deep work."}
            </p>

            <Button onClick={handleContinue} className="w-full cursor-pointer">
                Enter BeastMode Hub
            </Button>
        </div>
    );
}