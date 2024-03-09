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
}

function MembershipRequestCard({
  id,
  name,
  username,
  imgUrl,
  personType,
}: Props) {
  const auth = useAuth();
  const list = useOrganizationList();

  const role = auth.orgRole?.toString();

  console.log("ORGANIZATIONLIST:", list);

  console.log("ROLE:", role);

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
