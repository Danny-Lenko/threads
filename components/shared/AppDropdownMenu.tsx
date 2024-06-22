import { ReactNode, Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContentProps,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";

type Props = {
  children?: ReactNode | ReactNode[];
  triggerProps?: DropdownMenuTriggerProps;
  contentProps?: DropdownMenuContentProps;
  labelChildren?: ReactNode;
};

export const AppDropdownMenu = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{props.triggerProps?.children}</DropdownMenuTrigger>
      <DropdownMenuContent {...props.contentProps}>
        {props.labelChildren && (
          <>
            <DropdownMenuLabel>{props.labelChildren}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {props.children && Array.isArray(props.children) ? (
          props.children.map((child, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => {
                document.body.style.pointerEvents = "";
              }}
            >
              {child}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem
            onSelect={() => {
              document.body.style.pointerEvents = "";
            }}
          >
            {props.children}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
