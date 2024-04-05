"use client";

import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { Button } from "../ui/button";
import UserCard from "./UserCard";

import { AppTooltip } from "../shared/AppTooltip";

interface Props {
  userId: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  orgId: string;
  introduction: string;
}

function RequestsListCard({
  userId,
  name,
  username,
  imgUrl,
  personType,
  orgId,
  introduction,
}: Props) {
  const { organizationList } = useOrganizationList();

  const organization = useOrganization();

  const currentMembership = organizationList?.find(
    (org) => org.organization.id === orgId
  );

  const organizationMatches = organization.organization?.id === orgId;

  const role = currentMembership?.membership.role.toString();

  const handleAccept = async () => {
    try {
      const membership = await organization.organization?.addMember({
        userId,
        role: "org:member",
      });
      console.log("New member added:", membership);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

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

        {role === "org:admin" && !organizationMatches && (
          <>
            <AppTooltip
              tooltipProviderProps={{
                delayDuration: 200,
              }}
              tooltipTriggerProps={{
                children: (
                  <p className="user-card_btn cursor-default !bg-red-600 py-2 opacity-50">
                    Reject
                  </p>
                ),
              }}
              tooltipContentProps={{
                className: "bg-transparent !text-subtle-medium text-light1",
                children: <p>Login with the organization account</p>,
              }}
            />
            <AppTooltip
              tooltipProviderProps={{
                delayDuration: 200,
              }}
              tooltipTriggerProps={{
                children: (
                  <p className="user-card_btn cursor-default !bg-emerald-600 py-2 opacity-50">
                    Accept
                  </p>
                ),
              }}
              tooltipContentProps={{
                className: "bg-transparent !text-subtle-medium text-light1",
                children: <p>Login with the organization account</p>,
              }}
            />
          </>
        )}

        {role === "org:admin" && organizationMatches && (
          <>
            <Button className="user-card_btn !bg-red-600">Reject</Button>
            <Button
              className="user-card_btn !bg-emerald-600"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </>
        )}
      </div>
      <p className="ml-[60px]">{introduction}</p>
    </div>
  );
}

export default RequestsListCard;
