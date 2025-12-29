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
import { Button } from "@/components/ui/button";
import { CaretRightFill } from "react-bootstrap-icons";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export function DailyIntentionForm() {
    const [loading, setLoading] = useState(false);
    const [energyLevel, setEnergyLevel] = useState(1);
    const [mood, setMood] = useState("");
    const [text, setText] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!text || text.trim().length < 3) {
            toast.warning("Today's intention must be at least 3 character");
            return;
        }
        if (!mood) {
            toast.warning("Please select your mood");
            return;
        }

        try {
            setLoading(true);
            const formdata = new FormData;
            formdata.append("text", text);
            formdata.append("mood", mood);
            formdata.append("energyLevel", energyLevel.toString());
            await saveDailyIntention(formdata);
            window.location.href = "/dashboard";
        } catch(error) {
            toast.error("Failed to save intention. Please try again.");
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-full p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Daily Intention Setter</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="text">
                                {"What is today's main intention?"}
                            </Label>
                            <Input
                                id="text"
                                name="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                                placeholder="Crush my workout"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mood">Select Mood</Label>
                            <Select name="mood" value={mood} onValueChange={setMood} required>
                                <SelectTrigger id="mood" className="cursor-pointer">
                                    <SelectValue placeholder="How are you feeling today?" />
                                </SelectTrigger>
                                <SelectContent className="cursor-pointer">
                                    <SelectItem value="bad" className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            Bad <i className="bi bi-emoji-frown"></i>
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="alright" className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            Alright <i className="bi bi-emoji-neutral"></i>
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="good" className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            Good <i className="bi bi-emoji-laughing"></i>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="energy">
                                Energy Level: <span className="font-bold">{energyLevel}</span>
                            </Label>
                            <Slider
                                id="energy"
                                name="energyLevel"
                                value={[energyLevel]}
                                onValueChange={(value) => setEnergyLevel(value[0])}
                                min={1}
                                max={10}
                                step={1}
                                className="cursor-pointer"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full cursor-pointer"
                        >
                            {loading ? (
                                "Locking in..."
                            ) : (
                                <>
                                    {"Lock Today's Intention"} <CaretRightFill className="ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}