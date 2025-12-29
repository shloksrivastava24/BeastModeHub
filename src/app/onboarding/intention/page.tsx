import { DailyIntentionForm } from "@/components/onboarding/daily-intention-form";
import { getCurrentUser } from "@/lib/auth/current-user";
import { hasIntentionForToday } from "@/lib/db/has-intention";
import { redirect } from "next/navigation";

export default async function IntentionPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (!user.onboardingcompleted) redirect("/onboarding/archetype");

    if (await hasIntentionForToday(user._id)) redirect("/dashboard")

    return (
        <DailyIntentionForm />
    );
}
