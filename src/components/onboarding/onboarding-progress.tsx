"use client";

import { Progress } from "@/components/ui/progress"

interface ProgressBar {
    current: number;
    total: number;
}

export function OnBoardingProgress({ current, total }: ProgressBar) {
    const percent = Math.round((current / total) * 100);

    return (
        <div>
            <Progress value={percent} />
            <p className="text-xs text-muted-foreground text-right">
                    {percent}% complete
            </p>
        </div>
    );
}
