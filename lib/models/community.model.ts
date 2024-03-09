import mongoose, { Document, Schema, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  id: string;
  name: string;
  username: string;
  image?: string;
}

interface Request {
  user: Types.ObjectId | User;
  introduction: string;
}

export interface ICommunityDocument extends Document {
  id: string;
  username: string;
  name: string;
  members: Types.ObjectId[] | User[];
  requests: Request[];
  image?: string;
  bio?: string;
  createdBy?: Types.ObjectId | User;
  threads?: Types.ObjectId[];
  reposts?: Types.ObjectId[];
}

const communitySchema: Schema<ICommunityDocument> = new Schema({
  id: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: String,

  bio: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],

  reposts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repost",
    },
  ],

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  ],

  requests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      introduction: {
        type: String,
        required: true,
      },
    },
  ],
});

const Community =
  mongoose.models.Community ||
  mongoose.model<ICommunityDocument>("Community", communitySchema);

export default Community;
