"use client";

import { useContext, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EllipsisVertical, MessageCirclePlus } from "lucide-react";

import { FormContext } from "./FormProvider";
import { RejectRequestDialog } from "./RejectRequestDialog";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownDialogWrapper } from "./DropdownDialogWrapper";

interface Props {
  userId: string;
  orgId: string;
  requestId: string;
  userName?: string;
  orgName?: string;
}

function AdminButtons({ userName, orgName, userId, orgId, requestId }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const focusRef = useRef<HTMLButtonElement | null>(null);

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open: boolean) {
    if (open === false) {
      setDropdownOpen(false);
    }
    // ------------ custom timeout to prevent dropdown flashing on modal close
    setTimeout(() => {
      setHasOpenDialog(open);
    }, 0);
  }

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
    // -------------- source: https://codesandbox.io/embed/r9sq1q, https://github.com/radix-ui/primitives/issues/1836
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical
          className="ml-4 hidden cursor-pointer xs:block"
          ref={dropdownTriggerRef}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Items with dialog</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownDialogWrapper
            triggerChildren={
              <>
                <MessageCirclePlus className="h-5 w-5" />
                Accept
              </>
            }
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <RejectRequestDialog
              hiddenFormProviders={rejectHiddenProviders}
              action={formAction}
            />
          </DropdownDialogWrapper>

          <DropdownDialogWrapper
            triggerChildren="Delete"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this record?
            </DialogDescription>
          </DropdownDialogWrapper>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminButtons;
