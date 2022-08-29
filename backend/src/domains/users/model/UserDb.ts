import mongoose from "mongoose";

export interface UserDb extends mongoose.Document {
  email: string,
  password: string,
}

export const UserSchema = new mongoose.Schema(
  { 
    email: { type: String, required: true },
    password: { type: String, required: true},
  }
)

export const UserModel = mongoose.model<UserDb>('User', UserSchema)
