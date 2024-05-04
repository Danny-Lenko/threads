import { ReactNode } from "react";
import Image from "next/image";
import { AppSeparator } from "./AppSeparator";

interface Props {
  image?: string;
  name: string;
  username: string;
  bio?: string;
  children?: ReactNode;
}

function ProfileHeader({ image, name, username, bio, children }: Props) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={image || "/assets/avatar.svg"}
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
        {children}
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <AppSeparator />
    </div>
  );
}

export default ProfileHeader;
