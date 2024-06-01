import { User } from "@clerk/nextjs/dist/types/server";

import RequestsListCard from "../cards/RequestsListCard";
import { IRequestDocument } from "@/lib/models/request.model";
import AdminButtonsDisabled from "./AdminButtonsDisabled";

interface Props {
  user: User;
  requests: IRequestDocument[];
  orgId: string;
  userIsMember: boolean;
}

async function RequestsTab({ requests, userIsMember, orgId }: Props) {
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
      {requests.map((request) => {
        if (!("name" in request.user)) return null;

        return (
          <RequestsListCard
            key={request.user.id}
            request={request}
            orgId={orgId}
            personType="User"
          />
        );
      })}
    </section>
  );
}

export default RequestsTab;
