import { LoginButton } from "@/components/auth/login-button";
import { EmailLoginForm } from "@/components/auth/email-login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border p-6">
        <h1 className="text-2xl font-bold text-center">
          Welcome to BeastMode Hub 
        </h1>

        <p className="text-sm text-muted-foreground text-center">
          Sign in to activate Beast Mode
        </p>

        {/* Email Login */}
        <EmailLoginForm />

        <div className="relative text-center text-sm text-muted-foreground">
          <span className="bg-background px-2">or</span>
        </div>

        
        {/* Google Login */}
        <LoginButton />
      </div>
    </main>
  );
}
