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
import {UserSelect} from "./UserSelect";
import {MaxWidth, Width} from "./width";
import {ZIndex} from "./zIndex";

export interface StyleProperties {
  // Layout
  display?: Display;
  position?: Position;
  zIndex?: ZIndex;

  // Typography
  fontFamily?: FontFamily;
  fontSize?: FontSize;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
  textAlign?: TextAlign;
  textColor?: TextColor;
  textDecoration?: TextDecoration;
  textTransform?: TextTransform;
  verticalAlign?: VerticalAlign;
  whitespace?: Whitespace;
  wordBreak?: WordBreak;

  // Background
  backgroundColor?: BackgroundColor;

  // Border
  border?: Border;
  borderColor?: BorderColor;
  borderStyle?: BorderStyle;
  borderRadius?: BorderRadius;
  borderRadiusTop?: BorderRadiusTop;
  borderRadiusRight?: BorderRadiusRight;
  borderRadiusBottom?: BorderRadiusBottom;
  borderRadiusLeft?: BorderRadiusLeft;

  // Flexbox
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  alignSelf?: AlignSelf;
  justifyContent?: JustifyContent;
  flex?: Flex;
  flexGrow?: FlexGrow;
  flexShrink?: FlexShrink;

  // Spacing
  margin?: Margin;
  marginX?: MarginX;
  marginY?: MarginY;
  marginTop?: MarginTop;
  marginRight?: MarginRight;
  marginBottom?: MarginBottom;
  marginLeft?: MarginLeft;
  padding?: Padding;
  paddingX?: PaddingX;
  paddingY?: PaddingY;
  paddingTop?: PaddingTop;
  paddingRight?: PaddingRight;
  paddingBottom?: PaddingBottom;
  paddingLeft?: PaddingLeft;

  // Sizing
  width?: Width;
  maxWidth?: MaxWidth;
  height?: Height;
  minHeight?: MinHeight;

  // Effects
  shadow?: Shadow;
  opacity?: Opacity;
  animation?: Animation;

  // Interactivity
  cursor?: Cursor;
  pointerEvents?: PointerEvents;
  userSelect?: UserSelect;

  // Svg
  fill?: Fill;
  stroke?: Stroke;
}
