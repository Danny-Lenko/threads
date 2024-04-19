"use server";

import Community from "@/lib/models/community.model";
import { connectToDB } from "../../mongoose";

import Request from "@/lib/models/request.model";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface Params {
  userId: string;
  communityId: string;
  pathname: string;
}

const schema = z.object({
  introduction: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export async function createRequest(
  { userId, communityId, pathname }: Params,
  formData: FormData
) {
  console.log("INFO:", userId, communityId, pathname);
  console.log("FORMDATA:", formData.get("message-2"));

  // const introduction = formData.get("message-2");

  const validatedFields = schema.safeParse({
    introduction: formData.get("message-2"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

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
      introduction: validatedFields.data.introduction,
    });

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Failed to create repost: ${error.message}`);
  }
}
