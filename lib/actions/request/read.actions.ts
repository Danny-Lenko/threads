"use server";

import { connectToDB } from "../../mongoose";

import Request, { IRequestDocument } from "@/lib/models/request.model";
import User from "@/lib/models/user.model";
import { PipelineStage } from "mongoose";

export async function fetchPendingRequestsByCommunityId(
  id: string,
  searchParams?: { tag: string }
): Promise<IRequestDocument[]> {
  try {
    connectToDB();

    const matchCondition = { community: id, status: "pending" };

    const pipeline: PipelineStage[] = [
      { $match: matchCondition },
      {
        $addFields: {
          tagMatch: searchParams?.tag
            ? { $cond: [{ $eq: ["$tag", searchParams.tag] }, 1, 0] }
            : 0,
        },
      },
      { $sort: { tagMatch: -1, createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ];

    const requests: IRequestDocument[] = await Request.aggregate(pipeline);

    // not using aggregation, not using tag sorting
    // const requests: IRequestDocument[] = await Request.find({
    //   community: id,
    //   status: "pending",
    // })
    //   .sort({ createdAt: -1 })
    //   .populate({
    //     path: "user",
    //     model: User,
    //   });

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

    return requests.filter((request) => !request.rejectionMessage);
  } catch (error) {
    console.error("Error fetching requests: ", error);
    throw error;
  }
}
