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
            <p className="user-card_btn cursor-default !bg-red-600 py-2 opacity-50">
              Reject
            </p>
          ),
        }}
        tooltipContentProps={{
          className: "bg-transparent !text-subtle-medium text-light1",
          children: <p>Login with the organization account</p>,
        }}
      />
      <AppTooltip
        tooltipProviderProps={{
          delayDuration: 200,
        }}
        tooltipTriggerProps={{
          children: (
            <p className="user-card_btn cursor-default !bg-emerald-600 py-2 opacity-50">
              Accept
            </p>
          ),
        }}
        tooltipContentProps={{
          className: "bg-transparent !text-subtle-medium text-light1",
          children: <p>Login with the organization account</p>,
        }}
      />
    </>
  );
}

export default AdminButtonsDisabled;
