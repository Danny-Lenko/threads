import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ICommunityDocument } from "@/lib/models/community.model";

interface Props {
  authUserId: string;
  communityDetails: ICommunityDocument;
  type?: string;
  children?: ReactNode;
}

function ProfileHeader({
  authUserId,
  communityDetails: { createdBy, name, username, image, bio },
  type,
  children,
}: Props) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={image!}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        {createdBy?.id === authUserId && type !== "Community" && (
          <Link href="/profile/edit">
            <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
              <Image
                src="/assets/edit.svg"
                alt="logout"
                width={16}
                height={16}
              />

              <p className="text-light-2 max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
        {children}
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
