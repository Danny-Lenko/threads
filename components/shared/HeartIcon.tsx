"use client";

import { useCallback } from "react";
import Image from "next/image";
import useSWR, { useSWRConfig } from "swr";

import { fetchClientSideUser, saveThread } from "@/lib/actions/user";

interface Props {
  userId: string;
  threadId: string;
}

function HeartIcon({ userId, threadId }: Props) {
  const { data: userInfo } = useSWR("/api/userInfo", () =>
    fetchClientSideUser(userId)
  );

  const { mutate } = useSWRConfig();

  const handleClick = useCallback(async () => {
    await saveThread({ userId, threadId: JSON.parse(threadId) });
    mutate("/api/userInfo");
  }, [userId, threadId, mutate]);

  if (!userInfo) return null;

  const isSaved =
    userInfo &&
    JSON.parse(userInfo).savedThreads.includes(JSON.parse(threadId));

  const title = isSaved ? "Untag" : "Save";
  const src = isSaved ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg";

  return (
    <Image
      title={title}
      src={src}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
}

export default HeartIcon;
