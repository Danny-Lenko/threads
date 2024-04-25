"use client";

import { createContext, ReactNode, useEffect } from "react";

import { createRequest } from "@/lib/actions/request/create.actions";
import { useFormState } from "react-dom";
import { useToast } from "../ui/use-toast";

const formInitialState = {
  message: "",
};

export const FormContext = createContext<(payload: FormData) => void>(() => {});

export function FormProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const [formState, formAction] = useFormState(createRequest, formInitialState);

  useEffect(() => {
    if (formState.errors) {
      const [firstError] = Object.values(formState.errors)
        .flat()
        .filter(Boolean);
      toast({
        variant: "destructive",
        title: "Error sending your request",
        description: firstError,
      });
    }

    if (formState.message) {
      toast({
        title: "Success!",
        description: formState.message,
      });
    }
  }, [formState, toast]);

  return (
    <FormContext.Provider value={formAction}>{children}</FormContext.Provider>
  );
}
