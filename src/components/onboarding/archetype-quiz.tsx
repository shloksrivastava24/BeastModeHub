"use client";

import { quizQuestions } from "@/lib/onboarding/archetype-questions";
import { useQuizStore } from "@/store/archetype-quiz.store";
import { Button } from "../ui/button";
import { calculateArchetype } from "@/lib/onboarding/calculate-archetype";
import { ArchetypeResult } from "./archetype-result";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export function ArchetypeQuiz() {
    const { currentIndex, scores, answerQuestion } = useQuizStore();
    const total = quizQuestions.length;

    if (currentIndex >= total) {
        const archetype = calculateArchetype(scores);
        return <ArchetypeResult archetype={archetype} />;
    }

    const question = quizQuestions[currentIndex];
    const progress = Math.round((currentIndex / total) * 100);

    return (
        <div className="flex items-center justify-center min-h-full p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="space-y-4">
                    <div className="space-y-2">
                        <CardDescription>
                            Question {currentIndex + 1} of {total}
                        </CardDescription>
                        <Progress value={progress} className="h-2" />
                    </div>
                    <CardTitle className="text-2xl">
                        {question.question}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {question.options.map((option, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                size="lg"
                                className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-accent hover:border-primary transition-all cursor-pointer line-clamp-3"
                                onClick={() => answerQuestion(option.scores)}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="text-lg overflow-x-scroll no-scrollbar">{option.label}</span>
                                </span>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}