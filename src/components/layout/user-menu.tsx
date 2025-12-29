// components/layout/user-menu.tsx
import { getCurrentUser } from "@/lib/auth/current-user";
import { UserMenuClient } from "./user-menu-client";

export async function UserMenu() {
    const user = await getCurrentUser();
    
    if (!user) return null;
    
    const plainUser = {
        name: user.name || null,
        email: user.email || null,
    };
    
    return <UserMenuClient user={plainUser} />;
}