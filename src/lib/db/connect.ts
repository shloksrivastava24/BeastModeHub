import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

// eslint-disable-next-line prefer-const
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Connect to MongoDB using mongoose singleton pattern
 * This prevents multiple connections from being created
 */
export async function connectDB() {
    // If already connected, return the connection
    if (cached.conn) {
        return cached.conn;
    }

    // If no promise exists, create a new connection
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
        // Wait for connection and cache it
        cached.conn = await cached.promise;
    } catch (e) {
        // If connection fails, reset promise to allow retry
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}