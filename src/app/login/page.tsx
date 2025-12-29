import { LoginButton } from "@/components/auth/login-button";
import { EmailLoginForm } from "@/components/auth/email-login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <i className="bi bi-radioactive text-3xl text-primary"></i>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold">
            Welcome to BeastMode Hub
          </CardTitle>

          <CardDescription className="text-base">
            Sign in to activate Beast Mode and start your discipline journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Login */}
          <EmailLoginForm />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {/* Google Login */}
          <LoginButton />

          <p className="text-xs text-center text-muted-foreground pt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </main>
  );
}