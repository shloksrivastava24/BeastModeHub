"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import { CoreHabitLogModel } from "@/lib/db/core-habit-log.model";
import clientPromise from "@/lib/db/mongodb";
import { groq } from "@/lib/ai/groq-client";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";

export async function generateCoreHabitReview() {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    await connectDB();
    

    const habits = await CoreHabitModel.find({
        userId: user._id.toString(),
        isActive: true,
    }).lean();

    const logs = await CoreHabitLogModel.find({
        userId: user._id.toString(),
    }).lean();

    const summary = habits.map((habit) => {
        const completed = logs.filter(
            (l) => l.coreHabitId.toString() === habit._id.toString()
        ).length;

        return `- ${habit.title}: ${completed}/30 days`;
    });

    const prompt = `
You are a disciplined, minimal, no-nonsense productivity coach.

Your goal is to help the user improve discipline for the next 30-day cycle.
Be calm, practical, and specific. Avoid motivation fluff.

USER CONTEXT
Archetype: ${user.archetype}

CORE HABIT PERFORMANCE (last cycle)
${summary.join("\n")}

TASKS
1. Write exactly ONE short insight (1–2 sentences) about the user’s discipline pattern.
2. Write exactly ONE actionable suggestion (1 sentence) that can realistically be applied tomorrow.
3. Propose exactly FOUR realistic core habits for the next 30 days.
    - Each habit must be concrete and measurable.
    - Each habit must be achievable daily.
    - Each habit should fit the user’s archetype.

OUTPUT RULES (STRICT)
- Output MUST be valid JSON.
- Do NOT include explanations, commentary, or markdown.
- Do NOT include backticks or code fences.
- Do NOT include extra keys.
- Do NOT include emojis.
- Do NOT include newlines outside JSON formatting.

OUTPUT FORMAT (MUST MATCH EXACTLY)
{
    "insight": "string",
    "suggestion": "string",
    "suggestedHabits": [
    "string",
    "string",
    "string",
    "string"
    ]
}

`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("AI returned no content");

    const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
}
