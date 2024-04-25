"use client";

import { useContext, useState } from "react";
import { usePathname } from "next/navigation";

import { AppSubmitButton } from "../shared/AppSubmitButton";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { FormContext } from "./FormProvider";

interface Props {
  communityId: string;
  userId: string;
}

export function MembershipDialogForm({ communityId, userId }: Props) {
  const pathname = usePathname();

  const [introduction, setIntroduction] = useState("");
  const formAction = useContext(FormContext);

  return (
    <form action={formAction} className="grid gap-4 py-4">
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
      <DialogFooter>
        <AppSubmitButton>Send</AppSubmitButton>
      </DialogFooter>
    </form>
  );
}
