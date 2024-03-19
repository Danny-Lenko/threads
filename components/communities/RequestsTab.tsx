import { User } from "@clerk/nextjs/dist/types/server";
import RequestsListCard from "../cards/RequestsListCard";
import { IRequestDocument } from "@/lib/models/request.model";

interface Props {
  user: User;
  requests: IRequestDocument[];
  orgId: string;
  userIsMember: boolean;
}

async function RequestTab({ user, requests, userIsMember, orgId }: Props) {
  if (!userIsMember)
    return (
      <section className="section">
        <h2 className="text-center text-heading3-semibold text-slate-500">
          This content is for members only
        </h2>
      </section>
    );

  if (!requests.length)
    return (
      <section className="section">
        <h2 className="text-center text-heading3-semibold text-slate-500">
          No requests yet
        </h2>
      </section>
    );

  return (
    <section className="section gap-7">
      {requests.map(({ user, introduction }) => {
        if (!("name" in user)) return null;

        return (
          <RequestsListCard
            key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            imgUrl={user.image!}
            personType="User"
            orgId={orgId}
            introduction={introduction}
          />
        );
      })}
    </section>
  );
}

export default RequestTab;
