import { IRequestDocument } from "@/lib/models/request.model";
import UserCard from "./UserCard";
import AdminButtons from "../communities/AdminButtons";
import { RequestTag } from "../communities/RequestTag";

interface Props {
  request: IRequestDocument;
  personType: string;
  orgId: string;
  isAdmin: boolean;
}

async function RequestsListCard({
  request: { user, introduction, _id: requestId, tag },
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
            <RequestTag tag={tag} />

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
