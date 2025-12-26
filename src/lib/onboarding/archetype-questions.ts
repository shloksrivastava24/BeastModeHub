export type Archetype = "Titan" | "Phoenix" | "Shadow";
export interface QuizOption {
    label: string;
    scores: Record<Archetype, number>;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "when progress slows, you usually:",
        options: [
            {
                label: "Push harder and enforce discipline",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Rest, reflect, and restart stronger",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "Cut distractions and work silently",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
    {
        id: 2,
        question: "Your ideal work style is:",
        options: [
            {
                label: "Structured routine and intensity",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Flexible and adaptive",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "Deep focus alone",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
]