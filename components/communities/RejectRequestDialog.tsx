"use client";

import { ReactNode, useState } from "react";

import { Textarea } from "../ui/textarea";
import { AppSubmitButton } from "../shared/AppSubmitButton";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface Props {
  hiddenFormProviders: ReactNode;
  action: (payload: FormData) => void;
}

export function RejectRequestDialog({ hiddenFormProviders, action }: Props) {
  const [introduction, setIntroduction] = useState("");

  const formChildren = (
    <div className="grid w-full gap-1.5">
      <Textarea
        maxLength={300}
        placeholder="Type your message here."
        id="message"
        className="mb-4 border-dark-5"
        onChange={(e) => {
          setIntroduction(e.target.value);
        }}
        name="message"
        value={introduction}
      />
      {hiddenFormProviders}
    </div>
  );

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-body-medium">
          Write optional rejection message.
        </AlertDialogTitle>
        <AlertDialogDescription className="text-small-regular">
          The user will be able to do a revision and reapply.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form action={action}>
        {formChildren}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AppSubmitButton>Continue</AppSubmitButton>
        </AlertDialogFooter>
      </form>
    </>
  );
}
