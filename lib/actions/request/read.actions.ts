"use server";

import { connectToDB } from "../../mongoose";

import Request, { IRequestDocument } from "@/lib/models/request.model";
import User from "@/lib/models/user.model";

export async function fetchPendingRequestsByCommunityId(
  id: string
): Promise<IRequestDocument[]> {
  try {
    connectToDB();

    const requests: IRequestDocument[] = await Request.find({
      community: id,
      status: "pending",
    }).populate({
      path: "user",
      model: User,
    });

    return requests;
  } catch (error) {
    console.error("Error fetching requests: ", error);
    throw error;
  }
}

export async function fetchRequestsByCommunityId(
  id: string
): Promise<IRequestDocument[]> {
  try {
    connectToDB();

    const requests: IRequestDocument[] = await Request.find({
      community: id,
    }).populate({
      path: "user",
      model: User,
    });

    return requests.filter((request) => !request.reversionMessage);
  } catch (error) {
    console.error("Error fetching requests: ", error);
    throw error;
  }
}
