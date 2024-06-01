import { Tag } from "lucide-react";

import { IRequestDocument } from "@/lib/models/request.model";
import UserCard from "./UserCard";
import AdminButtons from "../communities/AdminButtons";

interface Props {
  request: IRequestDocument;
  personType: string;
  orgId: string;
  isAdmin: boolean;
}

function RequestsListCard({
  request: { user, introduction, _id: requestId },
  personType,
  orgId,
  isAdmin,
}: Props) {
  if (!("name" in user)) return null;
  const { id: userId, name, username, image: imgUrl } = user;

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

        {isAdmin && (
          <>
            <div
              title="New"
              className="absolute right-[calc(150rem/16)] cursor-pointer"
            >
              <Tag className="text-green-700" fill="" />
            </div>
            <AdminButtons
              userId={userId}
              userName={username}
              orgId={orgId}
              requestId={requestId}
            />
          </>
        )}
      </div>
      <p className="ml-[60px] hidden max-w-[300px] overflow-hidden text-ellipsis xs:block sm:max-w-[400px] lg:max-w-[600px]">
        {introduction}
      </p>
    </div>
  );
}

export default RequestsListCard;
