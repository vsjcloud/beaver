import {Animation} from "./animation";
import {BackgroundColor} from "./background";
import {
  Border,
  BorderColor,
  BorderRadius,
  BorderRadiusBottom, BorderRadiusLeft,
  BorderRadiusRight,
  BorderRadiusTop,
  BorderStyle,
} from "./border";
import {Cursor} from "./cursor";
import {Display} from "./display";
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  Flex,
  FlexDirection,
  FlexGrow,
  FlexShrink,
  FlexWrap,
  JustifyContent,
} from "./flexbox";
import {Height, MinHeight} from "./height";
import {Inset} from "./inset";
import {Margin, MarginBottom, MarginLeft, MarginRight, MarginTop, MarginX, MarginY} from "./margin";
import {Opacity} from "./opacity";
import {Padding, PaddingBottom, PaddingLeft, PaddingRight, PaddingTop, PaddingX, PaddingY} from "./padding";
import {PointerEvents} from "./pointerEvents";
import {Position} from "./position";
import {Shadow} from "./shadow";
import {Fill, Stroke} from "./svg";
import {
  FontFamily,
  FontSize,
  FontStyle,
  FontWeight,
  LineHeight,
  TextAlign,
  TextColor,
  TextDecoration,
  TextTransform,
  VerticalAlign,
  Whitespace,
  WordBreak,
} from "./text";
import {UserSelect} from "./userSelect";
import {MaxWidth, Width} from "./width";
import {ZIndex} from "./zIndex";

export default {
  // Layout
  Display,
  Position,
  Inset,
  ZIndex,

  // Typography
  FontFamily,
  FontSize,
  FontStyle,
  FontWeight,
  LineHeight,
  TextAlign,
  TextColor,
  TextDecoration,
  TextTransform,
  VerticalAlign,
  Whitespace,
  WordBreak,

  // Background
  BackgroundColor,

  // Border
  Border,
  BorderColor,
  BorderStyle,
  BorderRadius,
  BorderRadiusTop,
  BorderRadiusRight,
  BorderRadiusBottom,
  BorderRadiusLeft,

  // Flexbox
  FlexDirection,
  FlexWrap,
  AlignItems,
  AlignContent,
  AlignSelf,
  JustifyContent,
  Flex,
  FlexGrow,
  FlexShrink,

  // Spacing
  Margin,
  MarginX,
  MarginY,
  MarginTop,
  MarginRight,
  MarginBottom,
  MarginLeft,
  Padding,
  PaddingX,
  PaddingY,
  PaddingTop,
  PaddingRight,
  PaddingBottom,
  PaddingLeft,

  // Sizing
  Width,
  MaxWidth,
  Height,
  MinHeight,

  // Effects
  Shadow,
  Opacity,
  Animation,

  // Interactivity
  Cursor,
  PointerEvents,
  UserSelect,

  // Svg
  Fill,
  Stroke,
};
