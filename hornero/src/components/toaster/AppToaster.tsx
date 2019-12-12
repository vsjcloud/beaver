import {Position, Toaster} from "@blueprintjs/core";

export const AppToaster = Toaster.create({
  className: "global-toaster",
  position: Position.TOP_RIGHT,
});
