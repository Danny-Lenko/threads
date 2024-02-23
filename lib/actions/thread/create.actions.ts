"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../../mongoose";

import User from "../../models/user.model";
import Community from "../../models/community.model";
import Thread from "@/lib/models/thread.model";

interface Params {
  author: string;
  communityId: string | null;
  path: string;
  source: string;
}

export async function createRepost({
  author,
  communityId,
  path,
  source,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdRepost = await Thread.create({
      // text,
      author,
      community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
      source,
      // text: 'null',
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdRepost._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdRepost._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create repost: ${error.message}`);
  }
}
