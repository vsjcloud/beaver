import React from "react";

import {FormField} from "./formField";

export type FormValidator = {
  registerField<S extends FormField<{}>>(state: [S, React.Dispatch<React.SetStateAction<S>>]): [S, React.Dispatch<React.SetStateAction<S>>];
  wrapSubmit(onSuccess: () => void, onFailure?: () => void): () => void;
  allowSubmit(): boolean;
};

export type PropsWithRegisterField<P> = P & {
  registerField?<S extends FormField<{}>>(state: [S, React.Dispatch<React.SetStateAction<S>>]): [S, React.Dispatch<React.SetStateAction<S>>];
};

export function useFormValidator(): FormValidator {
  const firstSubmit = React.useRef(true);
  const formFields = React.useRef(new Map());
  const wrapperMemo = React.useRef(new Map());

  function wrapDispatcher<S extends FormField<{}>>(
    dispatcher: React.Dispatch<React.SetStateAction<S>>,
  ): React.Dispatch<React.SetStateAction<S>> {
    let wrapper = wrapperMemo.current.get(dispatcher);
    if (wrapper) {
      return wrapper;
    }
    wrapper = function (value: React.SetStateAction<S>): void {
      // This will not work when S is a function but S extends FormField
      // so this is not an issue
      const state = typeof value === "function" ? value(formFields.current.get(dispatcher)) : value;
      formFields.current.set(dispatcher, state);
      dispatcher(value);
    };
    wrapperMemo.current.set(dispatcher, wrapper);
    return wrapper;
  }

  function registerField<S extends FormField<{}>>(
    [initialState, dispatcher]: [S, React.Dispatch<React.SetStateAction<S>>],
  ): [S, React.Dispatch<React.SetStateAction<S>>] {
    formFields.current.set(dispatcher, initialState);
    return [initialState, wrapDispatcher(dispatcher)];
  }

  function validateForm(): boolean {
    let result = true;
    formFields.current.forEach((state, dispatcher) => {
      result = result && state.isSuccess();
      if (!state.getTouched()) {
        wrapDispatcher(dispatcher)(state.setTouched(true));
      }
    });
    return result;
  }

  function wrapSubmit(onSuccess: () => void, onFailure?: () => void): () => void {
    return function (): void {
      if (firstSubmit.current) {
        firstSubmit.current = false;
      }
      if (validateForm()) onSuccess();
      else if (onFailure) onFailure();
    };
  }

  function allowSubmit(): boolean {
    if (firstSubmit.current) return true;
    let result = true;
    formFields.current.forEach((state) => {
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
