"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import { EllipsisVertical, MessageCirclePlus } from "lucide-react";

import { FormContext } from "./FormProvider";
// import { Button } from "../ui/button";
// import { AppDialogConfirm } from "../shared/AppDialogConfirm";
import { RejectRequestDialog } from "./RejectRequestDialog";
import { AppDropdownMenu } from "../shared/AppDropdownMenu";
// import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";

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
    <Dialog>
      <AppDropdownMenu
        contentProps={{ side: "left" }}
        triggerProps={{
          children: (
            <EllipsisVertical className="ml-4 hidden cursor-pointer xs:block" />
          ),
        }}
        labelChildren="Request actions"
      >
        {/* Accept button dialog */}
        <DialogTrigger>
          <MessageCirclePlus />
        </DialogTrigger>
      </AppDropdownMenu>
      <RejectRequestDialog
        // communityId={orgId}
        // userId={userId}
        hiddenFormProviders={rejectHiddenProviders}
        action={formAction}
      />
    </Dialog>
  );
}

export default AdminButtons;
