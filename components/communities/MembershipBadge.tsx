"use client";

import { ComponentPropsWithoutRef } from "react";
// import { useOrganization } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function MembershipBadge({ children }: Props) {
//   const { organization } = useOrganization();

  return (
    <div className="absolute right-0 top-0 h-20">
      <Badge className="absolute right-0 top-1/2 -translate-y-1/2 rounded-xl px-4 py-2 sm:min-w-max">
        {children}
      </Badge>
      ;
    </div>
  );
}
