"use server";

import { connectToDB } from "../../mongoose";

import Community from "@/lib/models/community.model";
import Request from "@/lib/models/request.model";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  introduction: z
    .string({
      required_error: "Introduction is required",
      invalid_type_error: "Introduction must be a string",
    })
    .min(30, { message: "Introduction must be at least 30 characters long" })
    .max(300, { message: "Introduction must be at most 300 characters long" }),
  pathname: z.string({
    required_error: "Pathname is required",
    invalid_type_error: "Pathname must be a string",
  }),
  userId: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string",
  }),
  communityId: z.string({
    required_error: "Organization ID is required",
    invalid_type_error: "Organization ID must be a string",
  }),
});

export async function createRequest(
  prevState: {
    message?: string;
  },
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    introduction: formData.get("introduction"),
    pathname: formData.get("pathname"),
    userId: formData.get("userId"),
    communityId: formData.get("communityId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    connectToDB();
    const community = await Community.findOne({
      id: validatedFields.data.communityId,
    });
    const user = await User.findOne({ id: validatedFields.data.userId });
    if (!community) {
      return {
        errors: { databaseError: "Community not found" },
      };
    }
    if (!user) {
      return {
        errors: { databaseError: "User not found" },
      };
    }
    await Request.create({
      user: user._id,
      community: community._id,
      introduction: validatedFields.data.introduction,
    });
    revalidatePath(validatedFields.data.pathname);
    return { message: "Request sent successfully" };
  } catch (error: any) {
    throw new Error(`Failed to create repost: ${error.message}`);
  }
}
