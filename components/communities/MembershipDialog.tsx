"use client";

import { useContext, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AppDialogPropmt } from "../shared/AppDialogPrompt";
import { Textarea } from "../ui/textarea";
import { AppSubmitButton } from "../shared/AppSubmitButton";
import { usePathname } from "next/navigation";
import { FormContext } from "./FormProvider";

interface Props {
  communityId: string;
  userId: string;
}

export function MembershipDialog({ communityId, userId }: Props) {
  const pathname = usePathname();

  const [introduction, setIntroduction] = useState("");
  const formAction = useContext(FormContext);

  const triggerChildren = (
    <Button>
      <Image
        src="/assets/share.svg"
        alt="logout"
        width={16}
        height={16}
        className="min-w-[1rem] brightness-0 invert sm:-translate-x-2"
      />
      <span className="hidden sm:block">Request Membership</span>
    </Button>
  );

  const formChildren = (
    <div className="grid w-full gap-1.5">
      <Textarea
        required
        minLength={30}
        maxLength={300}
        placeholder="Type your message here."
        id="introduction"
        className="border-dark-5"
        onChange={(e) => {
          setIntroduction(e.target.value);
        }}
        name="introduction"
      />
      {/* Hidden input components to pass necessary arguments as submit form data */}
      <input hidden name="userId" defaultValue={userId} />
      <input hidden name="communityId" defaultValue={communityId} />
      <input hidden name="pathname" defaultValue={pathname} />
      <p className="text-subtle-medium text-dark-5">
        30/<span className="text-small-regular">{introduction.length}</span>
        /300
      </p>
    </div>
  );

  return (
    <AppDialogPropmt
      triggerProps={{
        children: triggerChildren,
        className:
          "community-card_btn absolute right-0 top-1/2 h-auto w-min -translate-y-1/2",
      }}
      titleProps={{
        children: "Introduce yourself",
        className: "text-body-medium",
      }}
      descriptionProps={{
        children: "Click send when you're done.",
        className: "text-small-regular",
      }}
      formProps={{ children: formChildren, action: formAction }}
      footerProps={{ children: <AppSubmitButton>Send</AppSubmitButton> }}
    />
  );
}
