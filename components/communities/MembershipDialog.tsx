"use client";

import { useReducer } from "react";

import { Button } from "@/components/ui/button";
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
import createRequest from "@/lib/actions/community/update.actions";

interface Props {
  communityId: string;
  userId: string;
}

type State = {
  text: string;
  count: number;
};

type Action = {
  type: string;
  payload: string;
};

const initialState: State = {
  text: "",
  count: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload, count: action.payload.length };
    default:
      return state;
  }
};

export function MembershipDialog({ communityId, userId }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log("STATE:", state);

  const sendRequest = async () => {
    const res = await createRequest({
      communityId,
      userId,
      introduction: state.text,
    });
    console.log("RES:", res);
  };

  return (
    <Dialog>
      <div className="absolute right-0 top-0 h-20">
        <DialogTrigger
          asChild
          className="community-card_btn absolute right-0 top-1/2 h-auto w-min -translate-y-1/2"
        >
          <Button>Request Membership</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="border-dark-5 bg-dark-2 text-light-1 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Introduce yourself</DialogTitle>
          <DialogDescription>
            Click send when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Textarea
              placeholder="Type your message here."
              id="message-2"
              className="border-dark-5"
              onChange={(e) => {
                dispatch({ type: "SET_TEXT", payload: e.target.value });
              }}
            />
            <p className="text-subtle-medium text-dark-5">
              30/<span className="text-small-regular">{state.count}</span>/300
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            // type="submit"
            className="border border-dark-5"
            onClick={sendRequest}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
