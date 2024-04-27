"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { connectToDB } from "../../mongoose";
import Request from "@/lib/models/request.model";

interface Params {
  requestId: string;
  pathname: string;
}

export async function acceptRequest({ requestId, pathname }: Params) {
  try {
    connectToDB();

    const request = await Request.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(requestId) },
      { status: "accepted" },
      { new: true, runValidators: true }
    );

    if (!request) {
      // throw new Error("Request not found");
      return {
        errors: { databaseError: "Request does not exist" },
      };
    }
    revalidatePath(pathname);
    return { message: "User added successfully" };
  } catch (error: any) {
    throw new Error(`Failed to update request: ${error.message}`);
  }
}
