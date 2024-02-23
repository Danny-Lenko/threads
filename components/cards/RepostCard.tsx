import Image from "next/image";
import Link from "next/link";

// import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import ThreadCard from "./ThreadCard";
// import HeartIcon from "../buttons/HeartIcon";
// import RepostIcon from "../buttons/RepostIcon";

interface Props {
  id: string;
  currentUserId: string;
  // parentId: string | null;
  // content: string;
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
  // comments: {
  //   author: {
  //     image: string;
  //   };
  // }[];
  // isComment?: boolean;
}

function RepostCard({
  id,
  currentUserId,
  // parentId,
  // content,
  author,
  community,
  createdAt,
  // comments,
  // isComment,
  source: string,
}: Props) {
  return (
    <article className={`flex w-full flex-col rounded-xl`}>
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

            {/* <div className="thread-card_bar" /> */}
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <div className="mt-2 text-small-regular text-light-2">
              {
                <ThreadCard />
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
