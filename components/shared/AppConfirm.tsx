import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogTriggerProps } from "@radix-ui/react-alert-dialog";

type Props = {
  //   tooltipProviderProps?: Partial<TooltipProviderProps>;
  triggerProps?: Partial<AlertDialogTriggerProps>;
  //   tooltipContentProps?: Partial<TooltipContentProps>;
};

export const AppConfirm = (props: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger {...props.triggerProps}>
        {props.triggerProps?.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

//   <TooltipProvider {...props.tooltipProviderProps}>
//     <Tooltip>
//       <TooltipTrigger {...props.tooltipTriggerProps}>
//         {props.tooltipTriggerProps?.children}
//       </TooltipTrigger>
//       <TooltipContent {...props.tooltipContentProps}>
//         {/* <p>Hello World</p> */}
//         {props.tooltipContentProps?.children}
//       </TooltipContent>
//     </Tooltip>
//   </TooltipProvider>
