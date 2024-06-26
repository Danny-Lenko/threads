"use client";

import { createContext, ReactNode, useEffect } from "react";

import { useFormState } from "react-dom";
import { useToast } from "../ui/use-toast";

const formInitialState = {
  message: "",
  errors: undefined,
};

interface ErrorsType {
  errors?: {
    [key: string]: string | undefined;
  };
}

interface SuccessType {
  message?: string;
}

export type FormStateType = ErrorsType | SuccessType;

interface Props {
  children: ReactNode;
  action: (
    prevState: FormStateType,
    formData: FormData
  ) => Promise<FormStateType>;
}

export const FormContext = createContext<(payload: FormData) => void>(() => {});

export function FormProvider({ children, action }: Props) {
  const { toast } = useToast();

  const [formState, formAction] = useFormState(action, formInitialState);

  useEffect(() => {
    if ("errors" in formState && formState.errors) {
      const [firstError] = Object.values(formState.errors)
        .flat()
        .filter(Boolean);
      toast({
        variant: "destructive",
        title: "Error sending your request",
        description: firstError as ReactNode,
      });
    }

    if ("message" in formState && formState.message) {
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
