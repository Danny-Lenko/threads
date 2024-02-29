"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";

export function MembershipDialog() {
  const [count, setCount] = useState(0);

  return (
    <Dialog>
      <div
        className="absolute right-0 top-0 max-h-20"
        style={{ minHeight: "80px" }}
      >
        <DialogTrigger
          asChild
          className="community-card_btn absolute right-0 top-1/2 h-auto w-min -translate-y-1/2"
        >
          <Button>Request Membership</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="border-dark-5 bg-dark-2 text-light-1 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Introduce yourself</DialogTitle>
          <DialogDescription>
            Click send when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Textarea
              placeholder="Type your message here."
              id="message-2"
              className="border-dark-5"
              onChange={(e) => setCount(e.target.value.length)}
            />
            <p className="text-subtle-medium text-dark-5">
              30/<span className="text-small-regular">{count}</span>/300
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="border border-dark-5">
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
