"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { clerkClient } from "@clerk/nextjs/server";

import { connectToDB } from "../../mongoose";
import Request from "@/lib/models/request.model";

export async function acceptRequest(
  prevState: {
    message?: string;
    errors?: { [key: string]: string | undefined };
  },
  formData: FormData
) {
  try {
    const membership =
      await clerkClient.organizations.createOrganizationMembership({
        organizationId: formData.get("communityId") as string,
        userId: formData.get("userId") as string,
        role: "org:member",
      });

    if (!membership)
      return {
        errors: { databaseError: "Clerk request returned with an error" },
      };

    connectToDB();

    const request = await Request.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(formData.get("requestId") as string) },
      { status: "accepted" },
      { new: true, runValidators: true }
    );

    if (!request) {
      return {
        errors: { databaseError: "Request does not exist" },
      };
    }
    revalidatePath(formData.get("pathname") as string);
    return { message: "User added successfully" };
  } catch (error: unknown) {
    return { errors: { databaseError: `Failed to accept request, ${error}` } };
  }
}
