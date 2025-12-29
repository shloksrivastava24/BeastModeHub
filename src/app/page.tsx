"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Target, Zap, TrendingUp } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleClick() {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted/20">
      <div className="container px-4 py-16 mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                <Zap className="h-4 w-4" />
                Discipline • Consistency • Growth
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                BeastMode Hub
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Transform your life with AI-powered habit tracking,
              daily todos, and personalized discipline coaching
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="p-6 bg-card border rounded-lg space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Core Habits</h3>
              <p className="text-sm text-muted-foreground">
                Lock in 4 essential habits for 30-day cycles
              </p>
            </div>

            <div className="p-6 bg-card border rounded-lg space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Daily Focus</h3>
              <p className="text-sm text-muted-foreground">
                8 priority tasks every day to maximize progress
              </p>
            </div>

            <div className="p-6 bg-card border rounded-lg space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">AI Coaching</h3>
              <p className="text-sm text-muted-foreground">
                Personalized insights and habit recommendations
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button
              size="lg"
              onClick={handleClick}
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              {status === "authenticated"
                ? "Go to Dashboard"
                : "Start Beast Mode"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">
              Join the discipline revolution • No fluff, just results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}