"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { Button } from "../ui/button";
import UserCard from "./UserCard";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  orgId: string;
  introduction: string;
}

function RequestsListCard({
  id,
  name,
  username,
  imgUrl,
  personType,
  orgId,
  introduction
}: Props) {
  const { organizationList } = useOrganizationList();

  const currentMembership = organizationList?.find(
    (org) => org.organization.id === orgId
  );

  const role = currentMembership?.membership.role.toString();

  return (
    <div>
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
      <p className="ml-[60px]">{introduction}</p>
    </div>
  );
}

export default RequestsListCard;
