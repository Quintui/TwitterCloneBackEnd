import { model, Schema, Document } from "mongoose";

export interface UserSchemaInterface {
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmed?: boolean;
  confirmHash: string;
  location?: string;
  about?: string;
  website?: string;
}

type UserSchemaModelType = UserSchemaInterface & Document;

const UserSchema = new Schema<UserSchemaModelType>({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  fullname: {
    required: true,
    type: String,
  },
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmHash: {
    required: true,
    type: String,
  },
  location: String,
  about: String,
  website: String,
});

export const UserModel = model<UserSchemaModelType>("User", UserSchema);
