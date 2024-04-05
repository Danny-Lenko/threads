import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TooltipContentProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from "@radix-ui/react-tooltip";

type Props = {
  tooltipProviderProps?: Partial<TooltipProviderProps>;
  tooltipTriggerProps?: Partial<TooltipTriggerProps>;
  tooltipContentProps?: Partial<TooltipContentProps>;
};

export const AppTooltip = (props: Props) => {
  return (
    <TooltipProvider {...props.tooltipProviderProps}>
      <Tooltip>
        <TooltipTrigger {...props.tooltipTriggerProps}>
          {props.tooltipTriggerProps?.children}
        </TooltipTrigger>
        <TooltipContent {...props.tooltipContentProps}>
          {/* <p>Hello World</p> */}
          {props.tooltipContentProps?.children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
