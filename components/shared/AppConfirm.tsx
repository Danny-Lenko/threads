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
import {
  AlertDialogCancelProps,
  AlertDialogDescriptionProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "@radix-ui/react-alert-dialog";

type Props = {
  triggerProps?: Partial<AlertDialogTriggerProps>;
  titleProps?: Partial<AlertDialogTitleProps>;
  descriptionProps?: Partial<AlertDialogDescriptionProps>;
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
        <AlertDialogFooter>
          <AlertDialogCancel {...props.cancelProps}>Cancel</AlertDialogCancel>
          <AlertDialogAction {...props.continueProps}>
            Continue
          </AlertDialogAction>
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
