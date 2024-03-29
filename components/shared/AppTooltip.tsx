import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProviderProps } from "@radix-ui/react-tooltip";

type Props = {
  tooltipProviderProps?: Partial<TooltipProviderProps>;
};

export const AppTooltip = (props: Props) => {
  return (
    <TooltipProvider {...props.tooltipProviderProps}>
      <Tooltip>
        <TooltipTrigger>
          <p
            className="user-card_btn !bg-red-600 py-2"
            // disabled={organization.organization === null}
          >
            Reject
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hello World</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
