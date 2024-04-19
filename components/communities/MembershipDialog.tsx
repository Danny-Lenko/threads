"use client";

import { useReducer } from "react";
// import { experimental_useFormStatus } from "react-dom";
// import { useFormStatus } from "react-dom";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AppSubmitButton } from "../shared/AppSubmitButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { createRequest } from "@/lib/actions/request/create.actions";
import { usePathname } from "next/navigation";

interface Props {
  communityId: string;
  userId: string;
}

type State = {
  text: string;
  count: number;
  open: boolean;
};

type Action =
  | {
      type: "SET_TEXT";
      payload: string;
    }
  | {
      type: "SET_OPEN";
      payload: boolean;
    };

const initialState: State = {
  text: "",
  count: 0,
  open: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload, count: action.payload.length };
    case "SET_OPEN":
      return { ...state, open: action.payload };
    default:
      return state;
  }
};

export function MembershipDialog({ communityId, userId }: Props) {
  const pathname = usePathname();

  const [state, dispatch] = useReducer(reducer, initialState);

  const createRequestOnSubmit = createRequest.bind(null, {
    communityId,
    userId,
    pathname,
  });

  // const handleClick = async () => {
  //   try {
  //     await createRequest({
  //       communityId,
  //       userId,
  //       introduction: state.text,
  //       pathname,
  //     });
  //     dispatch({ type: "SET_OPEN", payload: false });
  //   } catch (error) {
  //     console.log("ERROR:", error);
  //   }
  // };

  const setOpen = (open: boolean) => {
    dispatch({ type: "SET_OPEN", payload: open });
  };

  // const update = () => console.log("updated");

  return (
    <Dialog open={state.open} onOpenChange={(open) => setOpen(open)}>
      <div className="absolute right-0 top-0 h-20">
        <DialogTrigger
          asChild
          className="community-card_btn absolute right-0 top-1/2 h-auto w-min -translate-y-1/2"
        >
          <Button>
            <Image
              src="/assets/share.svg"
              alt="logout"
              width={16}
              height={16}
              className="min-w-[1rem] brightness-0 invert sm:-translate-x-2"
            />
            <span className="hidden sm:block">Request Membership</span>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="border-dark-5 bg-dark-2 text-light-1 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-body-medium">
            Introduce yourself
          </DialogTitle>
          <DialogDescription className="text-small-regular">
            Click send when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={createRequestOnSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full gap-1.5">
              <Textarea
                required
                minLength={30}
                maxLength={300}
                placeholder="Type your message here."
                id="message-2"
                className="border-dark-5"
                onChange={(e) => {
                  dispatch({ type: "SET_TEXT", payload: e.target.value });
                }}
                name="message-2"
              />
              <p className="text-subtle-medium text-dark-5">
                30/<span className="text-small-regular">{state.count}</span>/300
              </p>
            </div>
          </div>
          <DialogFooter>
            <AppSubmitButton
            // className="border border-dark-5" onClick={handleClick}
            >
              Send
            </AppSubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
