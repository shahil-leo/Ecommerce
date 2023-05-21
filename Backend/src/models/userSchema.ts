import { User } from "../interfaces/user";
import mongoose, { Model, Schema } from "mongoose";


const UserSchema: Schema<User> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    recoveryCode: {
        type: String
    }
},
    { timestamps: true })

export const UserModel: Model<User> = mongoose.model<User>('Users', UserSchema);