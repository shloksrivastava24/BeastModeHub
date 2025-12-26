import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongodb";
import { UserModel } from "@/lib/db/user.model";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        EmailProvider({
            from: "Beast-Mode Hub <onboarding@resend.dev>",
            server: {
                host: "smtp.resend.com",
                port: 587,
                auth: {
                    user: "resend",
                    pass: process.env.RESEND_API_KEY!,
                },
            },
        }),
    ],
    session: {
        strategy: "database",
    },
    pages: {
        signIn: "/login",
    },
    events: {
        async createUser({user}) {
            await UserModel.findByIdAndUpdate(user.id, {
                xp: 0,
                level: 1,
                onboardingcompleted: false,
            });
        },
    },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };