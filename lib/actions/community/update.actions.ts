"use server";

import User from "@/lib/models/user.model";
import Community from "../../models/community.model";

import { connectToDB } from "../../mongoose";

export async function updateCommunityInfo(
  communityId: string,
  name: string,
  username: string,
  image: string
) {
  try {
    connectToDB();

    const updatedCommunity = await Community.findOneAndUpdate(
      { id: communityId },
      { name, username, image }
    );

    if (!updatedCommunity) {
      throw new Error("Community not found");
    }

    return updatedCommunity;
  } catch (error) {
    console.error("Error updating community information:", error);
    throw error;
  }
}

async function createRequest({
  communityId,
  userId,
  introduction,
}: {
  communityId: string;
  userId: string;
  introduction: string;
}) {
  try {
    //  const community = await Community.findById(communityId);
    const community = await Community.findOne({ id: communityId });
    const user = await User.findOne({ id: userId });

    if (!community) {
      throw new Error("Community not found");
    }

    const newRequest = {
      user: user._id,
      introduction,
    };

    community.requests.push(newRequest);

    await community.save();

    return community;
  } catch (error) {
    console.error("Error updating community information:", error);
    throw error;
  }
}

export default createRequest;
