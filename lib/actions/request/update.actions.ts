"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { clerkClient } from "@clerk/nextjs/server";

import { connectToDB } from "../../mongoose";
import Request from "@/lib/models/request.model";
import { z } from "zod";

const schema = z.object({
  message: z
    .string({
      invalid_type_error: "Introduction must be a string",
    })
    .max(300, { message: "Introduction must be at most 300 characters long" }),
  pathname: z.string({
    required_error: "Pathname is required",
    invalid_type_error: "Pathname must be a string",
  }),
  requestId: z.string({
    required_error: "Request ID is required",
    invalid_type_error: "Request ID must be a string",
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

export async function acceptOrRejectRequest(
  prevState: {
    message?: string;
    errors?: { [key: string]: string | undefined };
  },
  formData: FormData
) {
  if (formData.get("type") === "reject") {
    return rejectRequest(prevState, formData);
  } else {
    return acceptRequest(prevState, formData);
  }
}

export async function acceptRequest(
  prevState: {
    message?: string;
    errors?: { [key: string]: string | undefined };
  },
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    message: formData.get("message"),
    pathname: formData.get("pathname"),
    requestId: formData.get("requestId"),
    userId: formData.get("userId"),
    communityId: formData.get("communityId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const membership =
      await clerkClient.organizations.createOrganizationMembership({
        organizationId: validatedFields.data.communityId,
        userId: validatedFields.data.userId,
        role: "org:member",
      });

    if (!membership)
      return {
        errors: { databaseError: "Clerk request returned with an error" },
      };

    connectToDB();

    const request = await Request.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(validatedFields.data.requestId) },
      { status: "accepted" },
      { new: true, runValidators: true }
    );

    if (!request) {
      return {
        errors: { databaseError: "Request does not exist" },
      };
    }
    revalidatePath(validatedFields.data.pathname);
    return { message: "User added successfully" };
  } catch (error: unknown) {
    return { errors: { databaseError: `Failed to accept request, ${error}` } };
  }
}

export async function rejectRequest(
  prevState: {
    message?: string;
    errors?: { [key: string]: string | undefined };
  },
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    message: formData.get("message"),
    pathname: formData.get("pathname"),
    requestId: formData.get("requestId"),
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

    const request = await Request.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(validatedFields.data.requestId) },
      { status: "rejected", message: validatedFields.data.message || "" },
      { new: true, runValidators: true }
    );

    if (!request) {
      return {
        errors: { databaseError: "Request does not exist" },
      };
    }

    revalidatePath(validatedFields.data.pathname);
    return { message: "Request rejected successfully" };
  } catch (error: unknown) {
    return { errors: { databaseError: `Failed to reject request, ${error}` } };
  }
}
