import { parseArgs } from "node:util";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import { InvalidArguments } from "@/errors/invalid-arguments";
import type { Command } from "@/types/command";

import { toParseArgsOptions } from "./typebox-to-parse-args-options";

export async function execute(command: Command) {
  const { optionSchema = Type.Object({}), positionalSchema = Type.Tuple([]) } =
    command;

  const raw = parseArgs({
    allowNegative: true,
    allowPositionals: !!command.positionalSchema,
    args: process.argv.slice(2),
    options: toParseArgsOptions(optionSchema),
    strict: false,
  });

  const schema = Type.Object({
    positionals: positionalSchema,
    values: optionSchema,
  });
  const converted = Value.Convert(schema, raw);
  const validationErrors = [...Value.Errors(schema, converted)];

  if (validationErrors.length) throw new InvalidArguments(validationErrors);

  // TODO: Implement This.
  return Promise.resolve(converted);
}
