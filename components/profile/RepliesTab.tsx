import { redirect } from "next/navigation";

// import { fetchCommunityPosts } from "@/lib/actions/community.actions";
// import { fetchUserPosts } from "@/lib/actions/user";

// import ThreadCard from "../cards/ThreadCard";
import { fetchUserReplies } from "@/lib/actions/thread";
import { ObjectId } from "mongoose";

// interface Result {
//   name: string;
//   image: string;
//   id: string;
//   threads: {
//     _id: string;
//     text: string;
//     parentId: string | null;
//     author: {
//       name: string;
//       image: string;
//       id: string;
//     };
//     community: {
//       id: string;
//       name: string;
//       image: string;
//     } | null;
//     createdAt: string;
//     children: {
//       author: {
//         image: string;
//       };
//     }[];
//   }[];
// }

interface Props {
  currentUserId: string;
  accountId: ObjectId;
  accountType: string;
}

async function RepliesTab({ currentUserId, accountId, accountType }: Props) {
  const result = await fetchUserReplies(accountId);

  console.log("REPLIES:", result.userReplies);
  console.log("RESULT:", result.userReplies[0]);

  //   console.log(
  //     "AUTHOR:",
  //     result.userReplies && result.userReplies.author && result.userReplies.author
  //   );

  //   if (accountType === "Community") {
  //     result = await fetchCommunityPosts(accountId);
  //   } else {
  //     result = await fetchUserPosts(accountId);
  //   }

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      Hello Replies
      {/* {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))} */}
    </section>
  );
}

export default RepliesTab;
