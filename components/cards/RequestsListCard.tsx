"use client";

import { ReactElement } from "react";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";

import UserCard from "./UserCard";
import AdminButtons from "../communities/AdminButtons";
// import { AppDialogConfirm } from "../shared/AppDialogConfirm";

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
          // <AppDropdownMenu
          //   contentProps={{ side: "left" }}
          //   triggerProps={{
          //     children: (
          //       <EllipsisVertical className="ml-4 hidden cursor-pointer xs:block" />
          //     ),
          //   }}
          //   labelChildren="Request actions"
          // >
          //   <AdminButtons
          //     userId={userId}
          //     userName={username}
          //     orgId={orgId}
          //     requestId={requestId}
          //     orgName={currentMembership?.organization.name}
          //   />
          // </AppDropdownMenu>
        )}
      </div>
      <p className="ml-[60px] hidden max-w-[300px] overflow-hidden text-ellipsis xs:block sm:max-w-[400px] lg:max-w-[600px]">
        {introduction}
      </p>
    </div>
  );
}

export default RequestsListCard;
