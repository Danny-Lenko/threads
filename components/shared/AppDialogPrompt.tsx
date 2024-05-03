import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DialogDescriptionProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog";
import { HTMLProps } from "react";

type Props = {
  triggerProps?: Partial<DialogTriggerProps>;
  titleProps?: Partial<DialogTitleProps>;
  descriptionProps?: Partial<DialogDescriptionProps>;
  formProps?: Partial<HTMLProps<HTMLFormElement>>;
  footerProps?: Partial<HTMLProps<HTMLDivElement>>;
};

export function AppDialogPropmt(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild {...props.triggerProps}>
        {props.triggerProps?.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle {...props.titleProps}>
            {props.titleProps?.children}
          </DialogTitle>
          <DialogDescription {...props.descriptionProps}>
            {props.descriptionProps?.children}
          </DialogDescription>
        </DialogHeader>
        <form {...props.formProps} action={props.formProps?.action}>
          {props.formProps?.children}
          <DialogFooter {...props.footerProps}>
            {props.footerProps?.children}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
