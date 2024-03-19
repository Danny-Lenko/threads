"use server";

import Community from "@/lib/models/community.model";
import { connectToDB } from "../../mongoose";

import Request from "@/lib/models/request.model";
import User from "@/lib/models/user.model";

interface Params {
  user: string;
  community: string;
  introduction: string;
  // path: string;
}

export async function createRequest({ user, community, introduction }: Params) {
  try {
    connectToDB();

    const currentCommunity = await Community.findOne({ id: community });
    const currentUser = await User.findOne({ id: user });

    await Request.create({
      user,
      community,
      introduction,
    });
  } catch (error: any) {
    throw new Error(`Failed to create repost: ${error.message}`);
  }
}
