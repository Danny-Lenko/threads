import { HTMLProps } from "react";

type Props = {
  children?: string;
  containerProps?: HTMLProps<HTMLDivElement>;
  lineProps?: HTMLProps<HTMLDivElement>;
};

export function AppSeparator({ children, lineProps, containerProps }: Props) {
  return (
    <div className="flex items-center" {...containerProps}>
      <div className="h-0.5 w-full bg-dark-3" {...lineProps} />
      {children && <h5 className="mx-3 text-dark-5">{children}</h5>}
      <div className="h-0.5 w-full bg-dark-3" {...lineProps} />
    </div>
  );
}
