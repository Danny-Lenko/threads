import { User } from "@clerk/nextjs/dist/types/server";

import RequestsListCard from "../cards/RequestsListCard";
import { IRequestDocument } from "@/lib/models/request.model";
import AdminButtonsDisabled from "./AdminButtonsDisabled";
import { AppSeparator } from "../shared/AppSeparator";

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
      <AppSeparator>New</AppSeparator>
      {requests.map(({ user, introduction, id }) => {
        if (!("name" in user)) return null;

        return (
          <RequestsListCard
            requestId={id}
            key={user.id}
            userId={user.id}
            name={user.name}
            username={user.username}
            imgUrl={user.image!}
            personType="User"
            orgId={orgId}
            introduction={introduction}
          >
            <AdminButtonsDisabled />
          </RequestsListCard>
        );
      })}
      <AppSeparator>Reapplied</AppSeparator>
    </section>
  );
}

export default RequestsTab;
