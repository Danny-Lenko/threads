"use server";

import { connectToDB } from "../../mongoose";

import Request, { IRequestDocument } from "@/lib/models/request.model";

export async function fetchRequestsByCommunityId(
  id: string
): Promise<IRequestDocument[]> {
  try {
    connectToDB();

    const requests = await Request.find({ community: id });
    return requests.filter((request) => !request.rejection);
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
