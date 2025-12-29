"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export function LoginButton() {
    return (
        <Button 
            onClick={() => signIn("google", {callbackUrl: "/dashboard"})}
            className="w-full cursor-pointer">
            <i className="bi bi-google"></i>continue with Google
        </Button>
    );
}

