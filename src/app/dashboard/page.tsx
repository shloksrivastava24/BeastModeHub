import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    if (!user.onboardingcompleted) {
        redirect("/onboarding")
    }

    return (
        <h1 className="text-2xl font-bold">
            welcome back, {user.name}
        </h1>
    );
}