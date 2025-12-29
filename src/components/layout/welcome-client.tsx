import { getCurrentUser } from "@/lib/auth/current-user";
import { WelcomeClient } from "./welcome-client-form";

export async function WelcomeUser() {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const UserName = user.name.trim().split(" ")[0] || "user";

    return <WelcomeClient user={UserName} />;
}