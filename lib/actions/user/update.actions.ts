"use server";

import { revalidatePath } from "next/cache";

import User from "../../models/user.model";

import { connectToDB } from "../../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

interface SaveThread {
  userId: string;
  threadId: string;
}

export async function saveThread({
  userId,
  threadId,
}: SaveThread): Promise<void> {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    const threadIndex = user.savedThreads.indexOf(threadId);
    if (threadIndex !== -1) {
      user.savedThreads.splice(threadIndex, 1);
    } else {
      user.savedThreads.push(threadId);
    }

    await user.save();

  } catch (error: any) {
    throw new Error(`Failed to save thread: ${error.message}`);
  }
}
