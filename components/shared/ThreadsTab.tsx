import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts, fetchUserReposts } from "@/lib/actions/user";

import ThreadCard from "../cards/ThreadCard";
import { TabsContent } from "../ui/tabs";

interface Thread {
  _id: string;
  text: string;
  parentId: string | null;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  children: {
    author: {
      image: string;
    };
  }[];
  source?: this;
}

interface Result {
  name: string;
  image: string;
  id: string;
  threads: Thread[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  id: string;
}

async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
  id,
}: Props) {
  let result: Result | undefined;
  let threads: Thread[];

  switch (accountType) {
    case "Community":
      result = await fetchCommunityPosts(accountId);
      threads = result!.threads;
      break;
    case "UserReposts":
      result = undefined;
      threads = await fetchUserReposts(accountId);
      break;
    default:
      result = await fetchUserPosts(accountId);
      threads = result!.threads;
  }

  if (!result && accountType !== "UserReposts") {
    redirect("/");
  }

  if (!threads.length)
    return (
      <TabsContent value="threads" className="w-full text-light-1">
        <section className="section">
          <h2 className="text-center text-heading3-semibold text-slate-500">
            No threads yet
          </h2>
        </section>
      </TabsContent>
    );

  return (
    <TabsContent value="threads" className="w-full text-light-1">
      <section className="section">
        {threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={
              accountType === "UserReposts" ? thread.source!.text : thread.text
            }
            author={
              accountType === "User"
                ? { name: result!.name, image: result!.image, id: result!.id }
                : accountType === "UserReposts"
                ? {
                    name: thread.source!.author.name,
                    image: thread.source!.author.image,
                    id: thread.source!.author.id,
                  }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={
              accountType === "Community"
                ? { name: result!.name, id: result!.id, image: result!.image }
                : accountType === "UserReposts"
                ? thread.source!.community
                : thread.community
            }
            createdAt={thread.createdAt}
            comments={
              accountType === "UserReposts"
                ? thread.source!.children
                : thread.children
            }
          />
        ))}
      </section>
    </TabsContent>
  );
}

export default ThreadsTab;
