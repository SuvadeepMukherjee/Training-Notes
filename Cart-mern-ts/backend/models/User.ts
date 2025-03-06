import mongoose, { Schema, Document, Model } from "mongoose";

// Interface defining the structure of an object
//The IUser interface defines the structure of a user object in TypeScript.
//inherits all properties and methods from the Document interface.
interface IUser extends Document {
  userId: string;
}

// Define the schema with TypeScript generics
// A generic in TypeScript allows us to create reusable, flexible, and type-safe components, functions, and classes
//  Schema<IUser> uses a generic type to enforce that this schema follows the IUser interface.
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
