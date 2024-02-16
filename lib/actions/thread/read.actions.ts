"use server";

import Thread from "../../models/thread.model";
import User from "../../models/user.model";
import Community from "../../models/community.model";

import { connectToDB } from "../../mongoose";
import { ObjectId } from "mongoose";

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "community",
      model: Community,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const threads = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + threads.length;

  return { threads, isNext };
}

export async function fetchUserReplies(
  userId: ObjectId,
  pageNumber = 1,
  pageSize = 20
) {
  connectToDB();

  // Calculate the number of threads to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch threads created by the user and that have parent IDs.
  const repliesQuery = Thread.find({
    author: userId,
    parentId: { $ne: null },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "community",
      model: Community,
    })
    // .populate({
    //   path: "parentId", // Populate the parent thread
    //   populate({
    //     path: "author",
    //     model: User
    //   })
    .populate({
      path: "parentId", // Populate the children field
      model: Thread,
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of threads created by the user and that have parent IDs.
  const totalThreadsCount = await Thread.countDocuments({
    author: userId,
    parentId: { $ne: null },
  });

  const userReplies = await repliesQuery.exec();

  const isNext = totalThreadsCount > skipAmount + userReplies.length;

  return { userReplies, isNext };
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
