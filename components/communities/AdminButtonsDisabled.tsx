import { EllipsisVertical } from "lucide-react";
import { AppTooltip } from "../shared/AppTooltip";

function AdminButtonsDisabled() {
  return (
    <>
      <AppTooltip
        tooltipProviderProps={{
          delayDuration: 200,
        }}
        tooltipTriggerProps={{
          children: (
            <EllipsisVertical className="ml-4 hidden text-slate-600 xs:block" />
          ),
        }}
        tooltipContentProps={{
          className: "bg-transparent !text-subtle-medium text-light1",
          children: <p>Log in with the organization account</p>,
        }}
      />
    </>
  );
}

export default AdminButtonsDisabled;
