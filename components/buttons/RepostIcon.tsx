"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { useOrganization } from "@clerk/nextjs";

import { fetchClientSideUser } from "@/lib/actions/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createRepost } from "@/lib/actions/thread/create.actions";

interface Props {
  userId: string;
  threadId: string;
}

function RepostIcon({ userId, threadId }: Props) {
  const pathname = usePathname();

  const { data: userInfo } = useSWR("/api/userInfo", () =>
    fetchClientSideUser(userId)
  );

  const { organization } = useOrganization();

  // const { mutate } = useSWRConfig();

  const handleClick = useCallback(async () => {
    console.log("PARAMS:", {
      author: userInfo && JSON.parse(userInfo)._id,
      communityId: organization ? organization.id : null,
      source: JSON.parse(threadId),
      path: pathname,
    });

    await createRepost({
      author: JSON.parse(userInfo!)._id,
      communityId: organization ? organization.id : null,
      source: JSON.parse(threadId),
      path: pathname,
    });
  }, [userId, threadId, userInfo]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-transparent outline-transparent">
        <Image
          title="Repost"
          src="/assets/repost.svg"
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-gray-700 bg-black text-small-regular hover:bg-gray-700"
        align="start"
      >
        <DropdownMenuItem
          onClick={handleClick}
          className="cursor-pointer py-0 text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          Repost
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default RepostIcon;
