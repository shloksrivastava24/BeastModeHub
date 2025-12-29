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
        question: "when progress slows or stalls, you usually:",
        options: [
            {
                label: "Push harder and enforce stricter rules",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Step back, recover, and restart stronger",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "Cut noise, isolate, and work silently",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
    {
        id: 2,
        question: "Your ideal work style is:",
        options: [
            {
                label: "Fixed routines, intensity, and pressure",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Flexible and adaptive system",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "Long, uninterrupted focus sessions",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
    {
        id: 3,
        question: "When you fail a commitment, your first instinct is to:",
        options: [
            {
                label: "Double down and eliminate excuses",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Forgive yourself and rebuild momentum",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "Analyze privately and redesign your system",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
    {
        id: 4,
        question: "What motivates you the MOST?",
        options: [
            {
                label: "Winning, progress, visible dominance",
                scores: { Titan: 1, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Growth, healing, becoming better than before",
                scores: { Titan: 0, Phoenix: 1, Shadow: 0 },
            },
            {
                label: "Mastery, control, mental clarity",
                scores: { Titan: 0, Phoenix: 0, Shadow: 1 },
            },
        ],
    },
    {
        id: 5,
        question: "Your biggest productivity enemy is:",
        options: [
            {
                label: "Laziness and lack of discipline",
                scores: { Titan: 1, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Emotional exhaustion or burnout",
                scores: { Titan: 0, Phoenix: 1, Shadow: 0 },
            },
            {
                label: "Distractions and mental noise",
                scores: { Titan: 0, Phoenix: 0, Shadow: 1 },
            },
        ],
    },
    {
        id: 6,
        question: "If you had an unexpected free day, you would:",
        options: [
            {
                label: "Turn it into a hardcore execution day",
                scores: { Titan: 1, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Use it to recover or realign priorities",
                scores: { Titan: 0, Phoenix: 1, Shadow: 0 },
            },
            {
                label: "Dive deeply into one meaningful task",
                scores: { Titan: 0, Phoenix: 0, Shadow: 1 },
            },
        ],
    },
    {
        id: 7,
        question: "Your relationship with routines is best described as:",
        options: [
            {
                label: "Routines create power — I rely on them",
                scores: { Titan: 1, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Routines help, but I adapt them often",
                scores: { Titan: 0, Phoenix: 1, Shadow: 0 },
            },
            {
                label: "Routines matter less than focus quality",
                scores: { Titan: 0, Phoenix: 0, Shadow: 1 },
            },
        ],
    },
    {
        id: 8,
        question: "When overwhelmed, you prefer to:",
        options: [
            {
                label: "Tighten control and increase pressure",
                scores: { Titan: 1, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Slow down and reduce expectations",
                scores: { Titan: 0, Phoenix: 1, Shadow: 0 },
            },
            {
                label: "Withdraw and remove all distractions",
                scores: { Titan: 0, Phoenix: 0, Shadow: 1 },
            },
        ],
    },
    {
        id: 9,
        question: "Which statement feels MOST like you?",
        options: [
            {
                label: "“Discipline creates freedom.”",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "“I grow strongest after setbacks.”",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "“Depth beats speed every time.”",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
    {
        id: 10,
        question: "When everything feels chaotic, your instinct is to:",
        options: [
            {
                label: "Impose order and take control",
                scores: { Titan: 2, Phoenix: 0, Shadow: 0 },
            },
            {
                label: "Stabilize yourself before acting",
                scores: { Titan: 0, Phoenix: 2, Shadow: 0 },
            },
            {
                label: "Disappear into focused work",
                scores: { Titan: 0, Phoenix: 0, Shadow: 2 },
            },
        ],
    },
]