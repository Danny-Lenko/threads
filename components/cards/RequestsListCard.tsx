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

  console.log("ORGANIZATION:", organization);

  const currentMembership = organizationList?.find(
    (org) => org.organization.id === orgId
  );

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
        {role === "org:admin" && (
          <>
            {/* <Button
              className="user-card_btn !bg-red-600"
              disabled={organization.organization === null}
            >
              Reject
            </Button> */}

            <AppTooltip
              tooltipProviderProps={{
                delayDuration: 200,
                disableHoverableContent: !!organization.organization,
              }}
            />

            <Button
              className="user-card_btn !bg-emerald-600"
              onClick={handleAccept}
              disabled={organization.organization === null}
              title="Hello World!"
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
