"use client";

import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { Button } from "../ui/button";
import UserCard from "./UserCard";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  orgId: string;
}

function MembershipRequestCard({
  id,
  name,
  username,
  imgUrl,
  personType,
  orgId,
}: Props) {
  const auth = useAuth();
  const { organizationList } = useOrganizationList();

  const role = auth.orgRole?.toString();

  console.log("ORGANIZATIONLIST:", organizationList);

  const isMember = organizationList?.find(
    (org) => org.organization.id === orgId
  );

  console.log("isMember:", isMember);

  return (
    <div className="flex w-full items-center gap-2 [&>*:first-child]:flex-1">
      <UserCard
        id={id}
        name={name}
        username={username}
        imgUrl={imgUrl}
        personType={personType}
      />
      {role === "org:admin" && (
        <>
          <Button className="user-card_btn !bg-red-600">Reject</Button>
          <Button className="user-card_btn !bg-emerald-600">Accept</Button>
        </>
      )}
    </div>
  );
}

export default MembershipRequestCard;
