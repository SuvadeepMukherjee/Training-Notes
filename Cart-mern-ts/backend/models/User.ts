import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for User document
interface IUser extends Document {
  userId: string;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
