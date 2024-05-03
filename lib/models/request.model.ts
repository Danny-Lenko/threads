import mongoose, { Document, Schema, Types } from "mongoose";

type RequestStatus = "pending" | "accepted" | "rejected";

export interface User {
  _id: Types.ObjectId;
  id: string;
  name: string;
  username: string;
  image?: string;
}

export interface IRequestDocument extends Document {
  user: Types.ObjectId | User;
  community: Types.ObjectId;
  introduction: string;
  status: RequestStatus;
  rejectionMessage?: string;
}

const requestSchema: Schema<IRequestDocument> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  rejectionMessage: {
    type: String,
    default: undefined,
  },
});

const Request =
  mongoose.models.Request ||
  mongoose.model<IRequestDocument>("Request", requestSchema);

export default Request;
