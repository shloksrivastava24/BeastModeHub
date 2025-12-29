"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { CoreHabitModel } from "@/lib/db/core-habit.model";
import { groq } from "@/lib/ai/groq-client";
import { getTodaysIntention } from "@/lib/intentions/get-todays-intention";
import { connectDB } from "@/lib/db/connect";

// Simple return type - just return the array or throw
export async function generateTodoSuggestions(): Promise<string[]> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const habits = await CoreHabitModel.find({
        userId: user._id.toString(),
        isActive: true,
    });

    const intention = await getTodaysIntention(user._id.toString());

    if (!intention) {
        throw new Error("Please set your daily intention first");
    }

    const prompt = `
You are a disciplined productivity assistant.

USER CONTEXT
Archetype: ${user.archetype}
Today's intention: "${intention.text}"
Mood: ${intention.mood}
Energy level: ${intention.energy}/10

CORE HABITS (fixed for this cycle)
${habits.map((h) => `- ${h.title}`).join("\n")}

TASK
Generate a list of TODOs for TODAY only.

RULES
- Suggest EXACTLY 8 todos.
- Each todo must be short, specific, and actionable.
- Todos must support or align with the listed core habits.
- Todos must be realistic to complete in a single day.
- Do NOT repeat the habit titles verbatim.
- Do NOT include explanations or commentary.
- Tasks should slightly push the user to improve

OUTPUT RULES (STRICT)
- Output ONLY valid JSON.
- Output ONLY a JSON array of strings.
- Do NOT include markdown, backticks, or extra text.
- Do NOT include numbering or bullet characters.

OUTPUT FORMAT (MUST MATCH EXACTLY)
[
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string"
]
`;

    const res = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
    });

    const raw = res.choices[0]?.message?.content;
    if (!raw) {
        throw new Error("AI returned no content");
    }

    // Clean and parse response
    const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    let suggestions: string[];
    try {
        suggestions = JSON.parse(cleaned);
    } catch (parseError) {
        console.error("Failed to parse AI response:", cleaned);
        throw new Error("Invalid AI response format");
    }

    // Validate response is array of strings
    if (
        !Array.isArray(suggestions) ||
        !suggestions.every((s) => typeof s === "string" && s.length >= 3)
    ) {
        throw new Error("Invalid suggestion format");
    }

    // Ensure we have exactly 8 suggestions
    const finalSuggestions = suggestions.slice(0, 8);

    // Pad with generic todos if less than 8
    while (finalSuggestions.length < 8) {
        finalSuggestions.push(`Complete task ${finalSuggestions.length + 1}`);
    }

    return finalSuggestions;
}