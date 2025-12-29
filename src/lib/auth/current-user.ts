import { getServerSession } from "next-auth";
import { UserModel } from "../db/user.model";
import clientPromise from "../db/mongodb";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "../db/connect";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    await connectDB();
    
    return UserModel.findOne({email: session.user.email});
}