"use server";

import Community from "@/lib/models/community.model";
import { connectToDB } from "../../mongoose";

import Request from "@/lib/models/request.model";
import User from "@/lib/models/user.model";

interface Params {
  userId: string;
  communityId: string;
  introduction: string;
}

export async function createRequest({
  userId,
  communityId,
  introduction,
}: Params) {
  try {
    connectToDB();
    
    const community = await Community.findOne({ id: communityId });
    const user = await User.findOne({ id: userId });

    if (!community) {
      throw new Error("Community not found");
    }

    if (!user) {
      throw new Error("User not found");
    }

    await Request.create({
      user: user._id,
      community: community._id,
      introduction,
    });
  } catch (error: any) {
    throw new Error(`Failed to create repost: ${error.message}`);
  }
}
