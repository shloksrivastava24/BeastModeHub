import { DailyIntentionForm } from "@/components/onboarding/daily-intention-form";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
    const user = await getCurrentUser();



    if (user.onboardingcompleted) {
        redirect("/dashboard");
    }

    return (
        <main className="min-h-screen flex items-center justify-center flex-col gap-5">
            <h1 className="text-3xl font-bold">How is the Beast today?</h1>
            <DailyIntentionForm />
        </main>
    );
}
