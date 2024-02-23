import Image from "next/image";
import Link from "next/link";

import DeleteThread from "../forms/DeleteThread";
import ThreadCard from "./ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";

interface Props {
  id: string;
  currentUserId: string;
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
  source: string;
}

async function RepostCard({ id, currentUserId, author, source }: Props) {
  const thread = await fetchThreadById(source);

  return (
    <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex items-end gap-3">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>
              <p className="text-small-light text-light-1">reposted</p>
            </div>

            <div className="text-small-regular text-light-2">
              {
                <ThreadCard
                  id={thread._id}
                  currentUserId={currentUserId}
                  parentId={null}
                  content={thread.text}
                  author={thread.author}
                  community={thread.community}
                  createdAt={thread.createdAt}
                  comments={[]}
                  isRepost
                />
              }
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={null}
          isComment={false}
        />
      </div>
    </article>
  );
}

export default RepostCard;
