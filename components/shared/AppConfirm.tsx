import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogCancelProps,
  AlertDialogDescriptionProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "@radix-ui/react-alert-dialog";
import { AppSubmitButton } from "./AppSubmitButton";
import { HTMLProps } from "react";

type Props = {
  triggerProps?: Partial<AlertDialogTriggerProps>;
  titleProps?: Partial<AlertDialogTitleProps>;
  descriptionProps?: Partial<AlertDialogDescriptionProps>;
  formProps?: Partial<HTMLProps<HTMLFormElement>>;
  cancelProps?: Partial<AlertDialogCancelProps>;
  continueProps?: Partial<AlertDialogCancelProps>;
};

export const AppConfirm = (props: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger {...props.triggerProps}>
        {props.triggerProps?.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.titleProps?.children}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.descriptionProps?.children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form {...props.formProps}>
          <AlertDialogFooter>
            <AlertDialogCancel {...props.cancelProps}>Cancel</AlertDialogCancel>
            <AppSubmitButton {...props.continueProps}>Continue</AppSubmitButton>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
