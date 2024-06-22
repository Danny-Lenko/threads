"use client";

import { ReactNode } from "react";
import { AppSubmitButton } from "../shared/AppSubmitButton";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "../ui/alert-dialog";

interface Props {
  userName: string;
  orgName: string;
  hiddenFormProviders: ReactNode;
  action: (payload: FormData) => void;
}

export function AcceptRequestDialog({
  hiddenFormProviders,
  action,
  userName,
  orgName,
}: Props) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-body-medium">
          Are you sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-small-regular">
          User @{userName} will be added to the &apos;{orgName}&apos; community
          and granted a &apos;member&apos; role.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form action={action}>
        {hiddenFormProviders}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AppSubmitButton>Continue</AppSubmitButton>
        </AlertDialogFooter>
      </form>
    </>
  );
}
