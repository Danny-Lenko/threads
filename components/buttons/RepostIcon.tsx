"use client";

// import { useCallback } from "react";
import Image from "next/image";
// import useSWR, { useSWRConfig } from "swr";

// import { fetchClientSideUser, saveThread } from "@/lib/actions/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  userId: string;
  threadId: string;
}

function RepostIcon({ userId, threadId }: Props) {
  //   const { data: userInfo } = useSWR("/api/userInfo", () =>
  //     fetchClientSideUser(userId)
  //   );

  //   const { mutate } = useSWRConfig();

  //   const handleClick = useCallback(async () => {
  //     await saveThread({ userId, threadId: JSON.parse(threadId) });
  //     mutate("/api/userInfo");
  //   }, [userId, threadId, mutate]);

  //   if (!userInfo) return null;

  //   const isSaved =
  //     userInfo &&
  //     JSON.parse(userInfo).savedThreads.includes(JSON.parse(threadId));

  //   const title = isSaved ? "Untag" : "Save";
  //   const src = isSaved ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg";

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
        <DropdownMenuItem className="cursor-pointer py-0 text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
          Repost
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default RepostIcon;
