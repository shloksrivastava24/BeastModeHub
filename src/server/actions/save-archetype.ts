"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { connectDB } from "@/lib/db/connect";
import clientPromise from "@/lib/db/mongodb";
import { UserModel } from "@/lib/db/user.model";
import mongoose from "mongoose";


export async function saveArchetype(archetype: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    await connectDB();
    

    await UserModel.findByIdAndUpdate(user._id, {
        archetype,
        onboardingcompleted: true,
    });
}