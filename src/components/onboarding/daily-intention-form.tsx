"use client";

import { saveDailyIntention } from "@/server/actions/save-intention";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "../ui/button";
import { CaretRightFill } from "react-bootstrap-icons";
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function DailyIntentionForm() {
    const [loading, setLoading] = useState(false);
    const [energyLevel, setEnergyLevel] = useState(1)

    async function handleSubmit(formdata: FormData) {
        setLoading(true);
        await saveDailyIntention(formdata);
        window.location.href = "/dashboard";
    }

    return (
        <form action={handleSubmit} className="space-y-6 max-w-md">
            <div>
                <label className="text-sm font-medium">
                    What is today’s main intention?
                </label>
                <Input
                    name="text"
                    required
                    placeholder="Crush my workout"
                    className="w-full mt-2 rounded-md border border-border px-3 py-2"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Select Mood</label>
                <Select>
                    <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="how are you feeling today?" />
                    </SelectTrigger>
                    <SelectContent className="w-full cursor-pointer">
                        <SelectItem value="low" className=" cursor-pointer">
                            <div className="flex items-center gap-2 cursor-pointer">
                                Bad<i className="bi bi-emoji-expressionless"></i>
                            </div>
                        </SelectItem>

                        <SelectItem value="neutral" className=" cursor-pointer">
                            <div className="flex items-center gap-2 cursor-pointer">
                                Alright<i className="bi bi-emoji-neutral"></i>
                            </div>
                        </SelectItem>

                        <SelectItem value="high" className=" cursor-pointer">
                            <div className="flex items-center gap-2 cursor-pointer">
                                Good<i className="bi bi-emoji-laughing"></i>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium">
                    Energy Level: <span>{energyLevel}</span>
                </label>
                <Slider
                    defaultValue={[1]}
                    value={[energyLevel]}
                    onValueChange={(e) => setEnergyLevel(e[0])}
                    min={1}
                    max={10}
                    step={1}
                    className={cn("w-full", "cursor-pointer")}
                    
                />
            </div>

            <Button type="submit" disabled={loading} className="w-full cursor-pointer">
                {loading ? "Locking in..." : (<>Lock Today’s Intention<CaretRightFill /></>)}
            </Button>
        </form>
    );
};