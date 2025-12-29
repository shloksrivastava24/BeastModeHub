import { Schema, model, models } from "mongoose";

const CoreHabitSchema = new Schema({
        userId: { 
            type: String, 
            required: true },
        title: { 
            type: String, 
            required: true },
        startDate: { 
            type: Date, 
            required: true },
        endDate: { 
            type: Date, 
            required: true },
        cycleNumber: { 
            type: Number, 
            default: 1 },
        isActive: { 
            type: Boolean, 
            default: true },
    },
    { 
        timestamps: true
    });

export const CoreHabitModel =
    models.CoreHabit || model("CoreHabit", CoreHabitSchema);
