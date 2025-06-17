import type { TOptionsDefault, TPositionalsDefault } from "./defaults";

export interface Command<
  TOptions extends TOptionsDefault = TOptionsDefault,
  TPositionals extends TPositionalsDefault = TPositionalsDefault,
> {
  optionSchema?: TOptions;
  positionalSchema?: TPositionals;
}
