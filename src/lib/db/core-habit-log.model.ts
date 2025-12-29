import {models, model, Schema} from "mongoose";

const CoreHabitLogSchema  = new Schema({
    coreHabitId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

CoreHabitLogSchema.index(
    {coreHabitId: 1, date: 1},
    {unique: true}
);

export const CoreHabitLogModel = models.CoreHabitLog  || model("CoreHabitLog", CoreHabitLogSchema );