"use client";

import { useContext } from "react";
import { FormContext } from "./FormProvider";
import { Button } from "../ui/button";
import { AppConfirm } from "../shared/AppConfirm";

interface Props {
  username?: string;
  orgname?: string;
}

function AdminButtons({ username, orgname }: Props) {
  const formAction = useContext(FormContext);

  return (
    <>
      <Button className="user-card_btn !bg-red-600">Reject</Button>
      <AppConfirm
        triggerProps={{
          children: (
            <div className="user-card_btn !bg-emerald-600 p-2">Accept</div>
          ),
        }}
        titleProps={{ children: "Are you sure?" }}
        descriptionProps={{
          children: `User @${username} will be added to the '${orgname}' community and granted a 'member' role.`,
        }}
        formProps={{ action: formAction }}
      />
    </>
  );
}

export default AdminButtons;
