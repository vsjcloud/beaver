export type ButtonColorStyle = {
  background: string;
  backgroundHover: string;
  textColor: string;
  textColorHover: string;
  borderColor: string;
};

export const ButtonColorBlue: ButtonColorStyle = {
  background: "bg-white",
  backgroundHover: "hover:bg-blue-4",
  textColor: "text-blue-2",
  textColorHover: "hover:text-white",
  borderColor: "border-blue-4",
};

export const ButtonColorGray: ButtonColorStyle = {
  background: "bg-white",
  backgroundHover: "hover:bg-gray-1",
  textColor: "text-dark-gray-4",
  textColorHover: "hover:text-white",
  borderColor: "border-gray-1",
};

export const ButtonColorOrange: ButtonColorStyle = {
  background: "bg-white",
  backgroundHover: "hover:bg-orange-4",
  textColor: "text-orange-2",
  textColorHover: "hover:text-white",
  borderColor: "border-orange-4",
};

export type ButtonSizeStyle = {
  paddingX: string;
  paddingY: string;
  fontSize: string;
};

export const ButtonSizeNormal: ButtonSizeStyle = {
  paddingX: "px-4",
  paddingY: "py-2",
  fontSize: "text-base",
};

export const ButtonSizeLarge: ButtonSizeStyle = {
  paddingX: "px-5",
  paddingY: "py-2",
  fontSize: "text-lg",
};

export function toClassName(buttonStyle: {}): string {
  return Object.values<string>(buttonStyle).join(" ");
}
