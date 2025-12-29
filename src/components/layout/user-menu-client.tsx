// components/layout/user-menu-client.tsx
"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Moon, Sun, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface UserMenuClientProps {
    user: {
        name: string | null;
        email: string | null;
    };
}

export function UserMenuClient({ user }: UserMenuClientProps) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);
    
    // Don't render theme toggle until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="outline-none cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-md hover:bg-accent text-2xl">
                        <i className="bi bi-person-circle"></i>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground font-normal">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="outline-none cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-md hover:bg-accent text-2xl">
                    <i className="bi bi-person-circle"></i>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
                {/* User Info Section */}
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground font-normal">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Theme Toggle */}
                <DropdownMenuItem
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="cursor-pointer"
                >
                    {theme === "dark" ? (
                        <>
                            <Sun className="mr-2 h-4 w-4" />
                            <span>Light Mode</span>
                        </>
                    ) : (
                        <>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Dark Mode</span>
                        </>
                    )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}