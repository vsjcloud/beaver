import React from "react";

import {Intent} from "./intent";

import {IconName} from "../../icons";


/**
 * A shared base interface for all component props.
 */
export interface Props {
  /** A space-delimited list of class names to pass along to a child element. */
  className?: string;
}

export interface IntentProps {
  /** Visual intent color to apply to element. */
  intent?: Intent;
}

export interface ActionProps extends IntentProps, Props {
  /** Whether this action is non-interactive. */
  disabled?: boolean;

  /** Name of an UI icon (or an icon element) to render before the text. */
  icon?: IconName;

  /** Click event handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/** A collection of curated prop keys used across our Components which are not valid HTMLElement props. */
const INVALID_PROPS = [
  "active",
  "alignText",
  "containerRef",
  "elementRef",
  "fill",
  "icon",
  "inputRef",
  "intent",
  "inline",
  "large",
  "loading",
  "leftIcon",
  "minimal",
  "onChildrenMount",
  "onRemove",
  "popoverProps",
  "rightElement",
  "rightIcon",
  "round",
  "small",
  "text",
];

/**
 * Typically applied to HTMLElements to filter out blacklisted props. When applied to a Component,
 * can filter props from being passed down to the children. Can also filter by a combined list of
 * supplied prop keys and the blacklist (only appropriate for HTMLElements).
 * @param props The original props object to filter down.
 * @param {string[]} invalidProps If supplied, overwrites the default blacklist.
 * @param {boolean} shouldMerge If true, will merge supplied invalidProps and blacklist together.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeNonHTMLProps(
  props: { [key: string]: any },
  invalidProps = INVALID_PROPS,
  shouldMerge = false
): { [key: string]: any } {
  if (shouldMerge) {
    invalidProps = invalidProps.concat(INVALID_PROPS);
  }

  return invalidProps.reduce(
    (prev, curr) => {
      if (Object.prototype.hasOwnProperty.call(prev, curr)) {
        delete (prev as any)[curr];
      }
      return prev;
    },
    {...props}
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */
