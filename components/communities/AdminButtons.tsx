"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import { EllipsisVertical } from "lucide-react";

import { FormContext } from "./FormProvider";
// import { Button } from "../ui/button";
import { AppDialogConfirm } from "../shared/AppDialogConfirm";
import { RejectRequestDialog } from "./RejectRequestDialog";
import { AppDropdownMenu } from "../shared/AppDropdownMenu";

interface Props {
  userId: string;
  orgId: string;
  requestId: string;
  userName?: string;
  orgName?: string;
}

function AdminButtons({ userName, orgName, userId, orgId, requestId }: Props) {
  const formAction = useContext(FormContext);
  const pathname = usePathname();

  const hiddenInputDataProviders = (
    <>
      <input hidden name="userId" defaultValue={userId} />
      <input hidden name="communityId" defaultValue={orgId} />
      <input hidden name="requestId" defaultValue={requestId} />
      <input hidden name="pathname" defaultValue={pathname} />
    </>
  );

  const rejectHiddenProviders = (
    <>
      <input hidden name="type" defaultValue="reject" />
      {hiddenInputDataProviders}
    </>
  );

  return (
    <AppDropdownMenu
      contentProps={{ side: "left" }}
      triggerProps={{
        children: (
          <EllipsisVertical className="ml-4 hidden cursor-pointer xs:block" />
        ),
      }}
      labelChildren="Request actions"
    >
      <RejectRequestDialog
        // communityId={orgId}
        // userId={userId}
        hiddenFormProviders={rejectHiddenProviders}
        action={formAction}
      />
      {/* Accept button dialog */}
      <AppDialogConfirm
        triggerProps={{
          children: (
            <div className="user-card_btn !bg-emerald-600 p-2">Accept</div>
          ),
        }}
        titleProps={{ children: "Are you sure?" }}
        descriptionProps={{
          children: `User @${userName} will be added to the '${orgName}' community and granted a 'member' role.`,
        }}
        formProps={{ action: formAction, children: hiddenInputDataProviders }}
      />
    </AppDropdownMenu>
  );
}

export default AdminButtons;
