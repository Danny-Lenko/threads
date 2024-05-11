"use client";

import { ReactNode, useState } from "react";
// import Image from "next/image";

// import { AppDialogPropmt } from "../shared/AppDialogPrompt";
import { Textarea } from "../ui/textarea";
import { AppSubmitButton } from "../shared/AppSubmitButton";
// import { MessageCircleX } from "lucide-react";
// import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
// import { usePathname } from "next/navigation";
// import { FormContext } from "./FormProvider";

interface Props {
  // communityId: string;
  // userId: string;
  hiddenFormProviders: ReactNode;
  action: (payload: FormData) => void;
}

export function RejectRequestDialog({
  // communityId,
  // userId,
  hiddenFormProviders,
  action,
}: Props) {
  const [introduction, setIntroduction] = useState("");

  //   const pathname = usePathname();
  //   const formAction = useContext(FormContext);

  // const triggerChildren = (
  //   <Button className="user-card_btn !bg-red-600">Reject</Button>
  // );

  const formChildren = (
    <div className="grid w-full gap-1.5">
      <Textarea
        //   required
        //   minLength={2}
        maxLength={300}
        placeholder="Type your message here."
        id="message"
        className="border-dark-5"
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
    <DialogContent className="z-[150] sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-body-medium">
          Send optional rejection message.
        </DialogTitle>
        <DialogDescription className="text-small-regular">
          The user will be able to do a revision and reapply.
        </DialogDescription>
      </DialogHeader>
      <form action={action}>
        {formChildren}
        <DialogFooter>
          <AppSubmitButton>Done</AppSubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
