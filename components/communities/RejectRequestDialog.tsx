"use client";

import { ReactNode } from "react";
// import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AppDialogPropmt } from "../shared/AppDialogPrompt";
import { Textarea } from "../ui/textarea";
import { AppSubmitButton } from "../shared/AppSubmitButton";
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
  //   const [introduction, setIntroduction] = useState("");

  //   const pathname = usePathname();
  //   const formAction = useContext(FormContext);

  const triggerChildren = (
    <Button className="user-card_btn !bg-red-600">Reject</Button>
  );

  const formChildren = (
    <div className="grid w-full gap-1.5">
      <Textarea
        //   required
        //   minLength={2}
        maxLength={300}
        placeholder="Type your message here."
        id="message"
        className="border-dark-5"
        //   onChange={(e) => {
        //     setIntroduction(e.target.value);
        //   }}
        name="message"
      />
      {hiddenFormProviders}
    </div>
  );

  return (
    <AppDialogPropmt
      triggerProps={{
        children: triggerChildren,
      }}
      titleProps={{
        children: "Send optional rejection message.",
        className: "text-body-medium",
      }}
      descriptionProps={{
        children: "The user will be able to do a revision and reapply.",
        className: "text-small-regular",
      }}
      formProps={{ children: formChildren, action }}
      footerProps={{ children: <AppSubmitButton>Done</AppSubmitButton> }}
    />
  );
}
