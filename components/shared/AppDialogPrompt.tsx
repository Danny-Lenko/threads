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
  //   continueProps?: Partial<AlertDialogActionProps>;
  footerProps?: Partial<HTMLProps<HTMLDivElement>>;
};

export function AppDialogPropmt(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild {...props.triggerProps}>
        {/* <Button variant="outline">Edit Profile</Button> */}
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
          {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
          <DialogFooter {...props.footerProps}>
            {props.footerProps?.children}
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
