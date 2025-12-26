import { create } from "zustand";
import { Archetype } from "@/lib/onboarding/archetype-questions";

interface QuizState {
    currentIndex: number;
    scores: Record<Archetype, number>;
    answerQuestion: (scores: Record<Archetype, number>) => void;
    reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentIndex: 0,
    scores: {
        Titan: 0,
        Phoenix: 0,
        Shadow: 0,
    },

    answerQuestion: (scores) =>
        set((state) => ({
            currentIndex: state.currentIndex + 1,
            scores: {
                Titan: state.scores.Titan + scores.Titan,
                Phoenix: state.scores.Phoenix + scores.Phoenix,
                Shadow: state.scores.Shadow + scores.Shadow,
            },
        })),

    reset: () =>
        set({
            currentIndex: 0,
            scores: { Titan: 0, Phoenix: 0, Shadow: 0 },
        }),
}));
