"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MembershipDialogForm } from "./MembershipDialogForm";

interface Props {
  communityId: string;
  userId: string;
  children: ReactNode;
}

export function MembershipDialog({ communityId, userId, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <div className="absolute right-0 top-0 h-20">
        <DialogTrigger
          asChild
          className="community-card_btn absolute right-0 top-1/2 h-auto w-min -translate-y-1/2"
        >
          <Button>
            <Image
              src="/assets/share.svg"
              alt="logout"
              width={16}
              height={16}
              className="min-w-[1rem] brightness-0 invert sm:-translate-x-2"
            />
            {children}
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="border-dark-5 bg-dark-2 text-light-1 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-body-medium">
            Introduce yourself
          </DialogTitle>
          <DialogDescription className="text-small-regular">
            Click send when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <MembershipDialogForm communityId={communityId} userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
