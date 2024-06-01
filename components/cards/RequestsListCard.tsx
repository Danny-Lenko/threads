import { auth } from "@clerk/nextjs/server";
import { Tag } from "lucide-react";

import { IRequestDocument } from "@/lib/models/request.model";
import UserCard from "./UserCard";
import AdminButtons from "../communities/AdminButtons";
import AdminButtonsDisabled from "../communities/AdminButtonsDisabled";

interface Props {
  request: IRequestDocument;
  personType: string;
  orgId: string;
}

function RequestsListCard({
  request: { user, introduction, _id: requestId },
  request,
  personType,
  orgId,
}: Props) {
  const { orgId: communityId } = auth();
  // const { has } = auth();
  // const isAdmin = has({ role: "org:admin" });
  // const isMember = has({ role: "org:member" });

  // console.log("AuthInfo:", authInfo);

  const isCommunityAccount = communityId === orgId;

  if (!("name" in user)) return null;
  const { id: userId, name, username, image: imgUrl } = user;

  console.log("REQUEST:", request);

  return (
    <div>
      <div className="flex w-full items-center gap-2 [&>*:first-child]:flex-1">
        <UserCard
          id={userId}
          name={name}
          username={username}
          imgUrl={imgUrl!}
          personType={personType}
        />

        <div
          title="New"
          className="absolute right-[calc(150rem/16)] cursor-pointer"
        >
          <Tag className="text-green-700" fill="" />
        </div>

        {!isCommunityAccount && <AdminButtonsDisabled orgId={orgId} />}

        {isCommunityAccount && (
          <AdminButtons
            userId={userId}
            userName={username}
            orgId={orgId}
            requestId={requestId}
          />
        )}
      </div>
      <p className="ml-[60px] hidden max-w-[300px] overflow-hidden text-ellipsis xs:block sm:max-w-[400px] lg:max-w-[600px]">
        {introduction}
      </p>
    </div>
  );
}

export default RequestsListCard;
