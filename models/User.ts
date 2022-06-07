import mongoose, { model, Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    role: {
      type: "string",
      enum: {
        values: ["admin", "client"],
        message: "{VALUE} no es un role válido.",
        default: "client",
        required: true,
      },
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;
