import { redirect } from "next/navigation";

import ThreadCard from "../cards/ThreadCard";
import { Separator } from "@/components/ui/separator";
import { fetchUserReplies } from "@/lib/actions/thread";
import { ObjectId } from "mongoose";

interface Props {
  currentUserId: string;
  accountId: ObjectId;
  accountType: string;
}

async function RepliesTab({ currentUserId, accountId, accountType }: Props) {
  const result = await fetchUserReplies(accountId);
  const replies = result?.userReplies;

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-10">
      {replies.map(
        (
          {
            _id,
            text,
            parentId: parent,
            author,
            community,
            createdAt,
            children,
          },
          index
        ) => (
          <>
            <ThreadCard
              key={parent._id}
              id={parent._id}
              currentUserId={currentUserId}
              parentId={null}
              content={parent.text}
              author={{
                name: parent.author.name,
                image: parent.author.image,
                id: parent.author.id,
              }}
              createdAt={createdAt}
              comments={children}
              community={community}
              isComment
            />
            <ThreadCard
              key={_id}
              id={_id}
              currentUserId={currentUserId}
              parentId={parent.id}
              content={text}
              author={{ name: author.name, image: author.image, id: author.id }}
              createdAt={createdAt}
              comments={children}
              community={community}
              isComment
            />
            {index !== replies.length - 1 && (
              <div className="flex max-w-full">
                <Separator className="my-8 w-7 bg-transparent" />
                <Separator className="my-8 flex-initial bg-neutral-800" />
                <Separator className="my-8 w-7 bg-transparent" />
              </div>
            )}
          </>
        )
      )}
    </section>
  );
}

export default RepliesTab;
