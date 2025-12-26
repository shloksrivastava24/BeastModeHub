import { Schema, model, models } from "mongoose";

const IntentionSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        enum: ["low", "neutral", "high"],
        required: true,
    },
    energy: {
        type: Number,
        min: 1,
        max: 10,
    },
    date: {
        type: String,
        required: true,
    },
}, {timestamps: true});

IntentionSchema.index({userId: 1, date: 1}, {unique: true});

export const IntentionModel = models.Intention || model("Intention", IntentionSchema);