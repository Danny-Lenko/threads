"use server";

import User from "@/lib/models/user.model";
import Community from "../../models/community.model";

import { connectToDB } from "../../mongoose";
import { revalidatePath } from "next/cache";

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

export async function createRequest({
  communityId,
  userId,
  introduction,
  pathname,
}: {
  communityId: string;
  userId: string;
  introduction: string;
  pathname: string;
}) {
  try {
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

    revalidatePath(pathname);
  } catch (error) {
    console.error("Error updating community information:", error);
    throw error;
  }
}
