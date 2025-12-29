"use client";

import { quizQuestions } from "@/lib/onboarding/archetype-questions";
import { useQuizStore } from "@/store/archetype-quiz.store";
import { Button } from "../ui/button";
import { calculateArchetype } from "@/lib/onboarding/calculate-archetype";
import { ArchetypeResult } from "./archetype-result";
import {OnBoardingProgress} from "@/components/onboarding/onboarding-progress";

export function ArchetypeQuiz() {
    const { currentIndex, scores, answerQuestion } = useQuizStore();
    const total = quizQuestions.length;

    if (currentIndex >= total) {
        const archetype = calculateArchetype(scores);
        return <ArchetypeResult archetype={archetype} />;
    }

    const question = quizQuestions[currentIndex];

    return (
        <div className="max-w-xl space-y-6">
            <OnBoardingProgress
                current={currentIndex}
                total={total}
            />

            <h2 className="text-xl font-semibold">
                {question.question}
            </h2>

            <div className="space-y-3">
                {question.options.map((option, idx) => (
                    <Button
                        key={idx}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => answerQuestion(option.scores)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}