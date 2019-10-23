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

  /** Action text. Can be any single React renderable. */
  text?: React.ReactNode;
}
