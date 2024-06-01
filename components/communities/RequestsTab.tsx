import { User } from "@clerk/nextjs/dist/types/server";
import { auth } from "@clerk/nextjs/server";
import { Info } from "lucide-react";

import RequestsListCard from "../cards/RequestsListCard";
import { IRequestDocument } from "@/lib/models/request.model";

interface Props {
  user: User;
  requests: IRequestDocument[];
  orgId: string;
  userIsMember: boolean;
}

async function RequestsTab({ requests, userIsMember, orgId }: Props) {
  const { orgId: communityId, has } = auth();
  const isAdmin = has({ role: "org:admin" });
  // const isMember = has({ role: "org:member" });

  console.log("isAdmin:", isAdmin);

  const isCommunityAccount = communityId === orgId;

  const infoTitle =
    !communityId || !isCommunityAccount
      ? "To manage membership requests log in with the organization account"
      : "Only administators can manage membership requests";

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
    <section className="section relative gap-7">
      {!isAdmin && (
        <div className="absolute -top-6 right-0" title={infoTitle}>
          <Info className="h-5 w-5" />
        </div>
      )}
      {requests.map((request) => {
        if (!("name" in request.user)) return null;

        return (
          <RequestsListCard
            key={request.user.id}
            request={request}
            personType="User"
            orgId={orgId}
            isAdmin={isAdmin}
          />
        );
      })}
    </section>
  );
}

export default RequestsTab;
