"use client";

import { useContext } from "react";
import { FormContext } from "./FormProvider";
import { Button } from "../ui/button";
import { AppDialogConfirm } from "../shared/AppDialogConfirm";
import { usePathname } from "next/navigation";

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
      {/* Hidden input components to pass necessary arguments as submitting form data */}
      <input hidden name="userId" defaultValue={userId} />  
      <input hidden name="communityId" defaultValue={orgId} />
      <input hidden name="requestId" defaultValue={requestId} />
      <input hidden name="pathname" defaultValue={pathname} />
    </>
  );

  return (
    <>
      <Button className="user-card_btn !bg-red-600">Reject</Button>
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
    </>
  );
}

export default AdminButtons;
