import type { Static, TObject, TTuple } from "@sinclair/typebox";

import type { TOptionsDefault, TPositionalsDefault } from "./defaults";

export interface Command<
  TOptions extends TOptionsDefault = TObject<Record<never, never>>,
  TPositionals extends TPositionalsDefault = TTuple,
> {
  handler: (args: {
    positionals: Static<TPositionals>;
    values: Static<TOptions>;
  }) => Promise<void> | void;
  optionSchema?: TOptions;
  positionalSchema?: TPositionals;
}
