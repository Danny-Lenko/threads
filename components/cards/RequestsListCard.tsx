"use client";

import { ReactElement } from "react";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";

import UserCard from "./UserCard";
import AdminButtons from "../communities/AdminButtons";

interface Props {
  requestId: string;
  userId: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  orgId: string;
  introduction: string;
  children: ReactElement;
}

function RequestsListCard({
  requestId,
  userId,
  name,
  username,
  imgUrl,
  personType,
  orgId,
  introduction,
  children,
}: Props) {
  const { organizationList } = useOrganizationList();
  const organization = useOrganization();
  const currentMembership = organizationList?.find(
    (org) => org.organization.id === orgId
  );
  const organizationMatches = organization.organization?.id === orgId;
  const role = currentMembership?.membership.role.toString();

  return (
    <div>
      <div className="flex w-full items-center gap-2 [&>*:first-child]:flex-1">
        <UserCard
          id={userId}
          name={name}
          username={username}
          imgUrl={imgUrl}
          personType={personType}
        />

        {/* Passing as children to keep it ssr */}
        {role === "org:admin" && !organizationMatches && children}

        {role === "org:admin" && organizationMatches && (
          <AdminButtons
            userId={userId}
            userName={username}
            orgId={orgId}
            requestId={requestId}
            orgName={currentMembership?.organization.name}
          />
        )}
      </div>
      <p className="ml-[60px]">{introduction}</p>
    </div>
  );
}

export default RequestsListCard;
