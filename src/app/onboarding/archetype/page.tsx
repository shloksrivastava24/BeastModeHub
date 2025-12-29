import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { ArchetypeQuiz } from "@/components/onboarding/archetype-quiz";

export default async function ArchetypePage() {
    const user = await getCurrentUser();
    
    if (!user) {
        redirect("/login");
    }

    if (user.onboardingcompleted) {
        redirect("/onboarding/intention");
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Discover Your Beast</CardTitle>
                </CardHeader>
                <CardContent>
                    <ArchetypeQuiz />
                </CardContent>
            </Card>
        </main>
    );
}
// app/onboarding/archetype/page.tsx (Server Component)

