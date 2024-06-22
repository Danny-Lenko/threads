import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogActionProps,
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
  
  // not tested well: have changed from AlertDialogCancelProps to AlertDialogActionProps
  continueProps?: Partial<AlertDialogActionProps>;
};

export const AppDialogConfirm = (props: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild {...props.triggerProps}>
        {props.triggerProps?.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.titleProps?.children}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.descriptionProps?.children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form {...props.formProps} action={props.formProps?.action}>
          <AlertDialogFooter>
            <AlertDialogCancel {...props.cancelProps}>Cancel</AlertDialogCancel>
            <AppSubmitButton {...props.continueProps}>Continue</AppSubmitButton>
            {props.formProps?.children}
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
