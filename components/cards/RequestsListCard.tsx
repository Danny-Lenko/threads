"use client";

import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { Button } from "../ui/button";
import UserCard from "./UserCard";

import { AppTooltip } from "../shared/AppTooltip";
import { acceptRequest } from "@/lib/actions/request/update.actions";
import { usePathname } from "next/navigation";
import { AppConfirm } from "../shared/AppConfirm";

interface Props {
  requestId: string;
  userId: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  orgId: string;
  introduction: string;
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
}: Props) {
  const { organizationList } = useOrganizationList();
  const pathname = usePathname();

  const organization = useOrganization();

  const currentMembership = organizationList?.find(
    (org) => org.organization.id === orgId
  );

  const organizationMatches = organization.organization?.id === orgId;

  const role = currentMembership?.membership.role.toString();

  const handleAccept = async () => {
    console.log("ACCEPTING:", userId);

    try {
      const membership = await organization.organization?.addMember({
        userId,
        role: "org:member",
      });

      await acceptRequest({ requestId, pathname });
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
            <AppConfirm
              triggerProps={{
                children: (
                  <div className="user-card_btn !bg-emerald-600 p-2">
                    Accept
                  </div>
                ),
              }}
              titleProps={{ children: "Are you sure?" }}
              descriptionProps={{
                children: `User @${username} will be added to the '${currentMembership?.organization.name}' community and granted a 'member' role.`,
              }}
              formProps={{ action: () => handleAccept() }}
            />
          </>
        )}
      </div>
      <p className="ml-[60px]">{introduction}</p>
    </div>
  );
}

export default RequestsListCard;
