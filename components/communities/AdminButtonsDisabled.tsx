"use client";

import { EllipsisVertical } from "lucide-react";
import { AppTooltip } from "../shared/AppTooltip";
import { useOrganizationList } from "@clerk/nextjs";

function AdminButtonsDisabled({ orgId }: { orgId: string }) {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const isAdmin = userMemberships.data?.filter(
    (org) => org.role === "org:admin" && org.organization.id === orgId
  ).length;

  console.log(
    "USER MEMBERSHIPS:",
    userMemberships.data?.filter((org) => org.role === "org:admin")
  );

  if (!isAdmin) return null;

  return (
    <>
      <AppTooltip
        tooltipProviderProps={{
          delayDuration: 200,
        }}
        tooltipTriggerProps={{
          children: (
            <EllipsisVertical className="ml-4 hidden text-slate-600 xs:block" />
          ),
        }}
        tooltipContentProps={{
          className: "bg-transparent !text-subtle-medium text-light1",
          children: <p>Log in with the organization account</p>,
        }}
      />
    </>
  );
}

export default AdminButtonsDisabled;
