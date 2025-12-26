import { Schema, model, models } from "mongoose"


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    image: String,
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
    archetype: {
        type: String,
        enum: ["Titan", "Phoenix", "Shadow"],
    },
    onboardingcompleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true}
);

export const UserModel = models.User || model("User", UserSchema);