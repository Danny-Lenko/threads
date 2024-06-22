import { forwardRef, LegacyRef, ReactNode } from "react";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  triggerChildren: ReactNode;
  onSelect?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export const DropdownDialogWrapper = forwardRef<HTMLButtonElement, Props>(
  (props, forwardedRef) => {
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
      props;
    return (
      <AlertDialog onOpenChange={onOpenChange}>
        <AlertDialogTrigger
          asChild
          className="flex w-full cursor-pointer items-center gap-2 text-base-regular"
        >
          <DropdownMenuItem
            {...itemProps}
            ref={forwardedRef as LegacyRef<HTMLDivElement> | undefined}
            onSelect={(event: Event) => {
              event.preventDefault();
              onSelect && onSelect();
              document.body.style.pointerEvents = "";
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </AlertDialogTrigger>
        <AlertDialogContent>{children}</AlertDialogContent>
      </AlertDialog>
    );
  }
);
DropdownDialogWrapper.displayName = "DropdownDialogWrapper";
