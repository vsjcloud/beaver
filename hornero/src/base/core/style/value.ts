import {Animation} from "./properties/animation";
import {BackgroundColor} from "./properties/background";
import {
  Border,
  BorderColor,
  BorderRadius,
  BorderRadiusBottom, BorderRadiusLeft,
  BorderRadiusRight,
  BorderRadiusTop,
  BorderStyle,
} from "./properties/border";
import {Cursor} from "./properties/cursor";
import {Display} from "./properties/display";
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
} from "./properties/flexbox";
import {Height, MinHeight} from "./properties/height";
import {Margin, MarginBottom, MarginLeft, MarginRight, MarginTop, MarginX, MarginY} from "./properties/margin";
import {Opacity} from "./properties/opacity";
import {Padding, PaddingBottom, PaddingLeft, PaddingRight, PaddingTop, PaddingX, PaddingY} from "./properties/padding";
import {PointerEvents} from "./properties/pointerEvents";
import {Position} from "./properties/position";
import {Shadow} from "./properties/shadow";
import {Fill, Stroke} from "./properties/svg";
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
} from "./properties/text";
import {UserSelect} from "./properties/UserSelect";
import {MaxWidth, Width} from "./properties/width";
import {ZIndex} from "./properties/zIndex";

export default {
  // Layout
  Display,
  Position,
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
