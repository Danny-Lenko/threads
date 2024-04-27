"use client";

import { useOrganizationList, useOrganization } from "@clerk/nextjs";
// import { Button } from "../ui/button";
import UserCard from "./UserCard";

// import { AppTooltip } from "../shared/AppTooltip";
import { acceptRequest } from "@/lib/actions/request/update.actions";
import { usePathname } from "next/navigation";
// import { AppConfirm } from "../shared/AppConfirm";
import { ReactElement } from "react";
import { FormProvider, FormStateType } from "../communities/FormProvider";
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
  const pathname = usePathname();

  const { organizationList } = useOrganizationList();
  const organization = useOrganization();
  const currentMembership = organizationList?.find(
    (org) => org.organization.id === orgId
  );
  const organizationMatches = organization.organization?.id === orgId;
  const role = currentMembership?.membership.role.toString();

  console.log("ORGANIZATIONMATCHES:", organizationMatches);

  const handleAccept = async (prevState: FormStateType, formData: FormData) => {
    console.log("ACCEPTING:", userId);

    // try {
    const membership = await organization.organization?.addMember({
      userId,
      role: "org:member",
    });

    if (!membership)
      return {
        errors: { databaseError: "Clerk request returned with an error" },
      };

    console.log("New member added:", membership);

    // return await acceptRequest({ requestId, pathname });

    const message = await acceptRequest({ requestId, pathname });

    console.log("MESSAGE:", message);

    return message;
    // } catch (error) {
    //   console.error("Error adding member:", error);
    // }
  };

  // console.log("USERNAME", username);

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
          <FormProvider action={handleAccept}>
            <AdminButtons
              username={username}
              orgname={currentMembership?.organization.name}
            />
          </FormProvider>
        )}
      </div>
      <p className="ml-[60px]">{introduction}</p>
    </div>
  );
}

export default RequestsListCard;
