import { ArchetypeQuiz } from "@/components/onboarding/archetype-quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArchetypePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Discover Your Beast</CardTitle>
                </CardHeader>
                <CardContent>
                    <ArchetypeQuiz />
                </CardContent>
            </Card>
        </main>
    );
}
