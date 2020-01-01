import React from "react";

import {FormField} from "./formField";

export type FormValidator = {
  registerField<S extends FormField<{}>>(state: [S, React.Dispatch<React.SetStateAction<S>>]): [S, React.Dispatch<React.SetStateAction<S>>];
  wrapSubmit(onSuccess: () => void, onFailure?: () => void): () => void;
  allowSubmit(): boolean;
};

export function useFormValidator(): FormValidator {
  const [firstSubmit, setFirstSubmit] = React.useState(true);

  const formFields = new Map();

  function wrapDispatcher<S extends FormField<{}>>(
    dispatcher: React.Dispatch<React.SetStateAction<S>>,
  ): React.Dispatch<React.SetStateAction<S>> {
    return function (value: React.SetStateAction<S>): void {
      // This will not work when S is a function but S extends FormField
      // so this is not an issue
      const state = typeof value === "function" ? value(formFields.get(dispatcher)) : value;
      formFields.set(dispatcher, state);
      dispatcher(value);
    }
  }

  function registerField<S extends FormField<{}>>(
    [initialState, dispatcher]: [S, React.Dispatch<React.SetStateAction<S>>],
  ): [S, React.Dispatch<React.SetStateAction<S>>] {
    formFields.set(dispatcher, initialState);
    return [initialState, wrapDispatcher(dispatcher)];
  }

  function validateForm(): boolean {
    let result = true;
    formFields.forEach((state, dispatcher) => {
      result = result && state.isSuccess();
      if (!state.getTouched()) {
        wrapDispatcher(dispatcher)(state.setTouched(true));
      }
    });
    return result;
  }

  function wrapSubmit(onSuccess: () => void, onFailure?: () => void): () => void {
    return function (): void {
      if (firstSubmit) {
        setFirstSubmit(false);
      }
      if (validateForm()) onSuccess();
      else if (onFailure) onFailure();
    }
  }

  function allowSubmit(): boolean {
    if (firstSubmit) return true;
    let result = true;
    formFields.forEach((state) => {
      result = result && state.isSuccess();
    });
    return result;
  }

  return {
    registerField,
    wrapSubmit,
    allowSubmit,
  };
}
