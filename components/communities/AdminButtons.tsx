"use client";

import { useContext, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  EllipsisVertical,
  MessageCirclePlus,
  MessageCircleX,
} from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import { FormContext } from "./FormProvider";
import { RejectRequestDialog } from "./RejectRequestDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownDialogWrapper } from "./DropdownDialogWrapper";
import { AcceptRequestDialog } from "./AcceptRequesDialog";

interface Props {
  userId: string;
  orgId: string;
  requestId: string;
  userName?: string;
}

function AdminButtons({ userName, userId, orgId, requestId }: Props) {
  const { organization } = useOrganization();

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

  const acceptHiddenProviders = (
    <>
      <input hidden name="message" defaultValue="" />
      {hiddenInputDataProviders}
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
          <DropdownMenuLabel>Request actions</DropdownMenuLabel>
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
            <AcceptRequestDialog
              hiddenFormProviders={acceptHiddenProviders}
              action={formAction}
              userName={userName || ""}
              orgName={organization?.name || ""}
            />
          </DropdownDialogWrapper>

          <DropdownDialogWrapper
            triggerChildren={
              <>
                <MessageCircleX className="h-5 w-5 text-red-500" />
                <span className="text-red-500">Reject</span>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminButtons;
