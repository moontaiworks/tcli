import type { ParseArgsOptionDescriptor } from "node:util";

import { type TObject, type TSchema, TypeGuard } from "@sinclair/typebox";

/**
 * Transform a single TypeBox schema to Node.js `parseArgs` option.
 * @param schema Any TypeBox Schema to transform.
 * @returns a `parseArgs` option descriptor.
 */
export function toParseArgsOption(schema: TSchema) {
  const option: ParseArgsOptionDescriptor = {
    multiple: TypeGuard.IsArray(schema),
    type: TypeGuard.IsBoolean(schema) ? "boolean" : "string",
  };

  if (schema.alias) option.short = schema.alias;

  return option;
}

/**
 * Transform whole TypeBox Object to Node.js `parseArgs` options.
 * @param schema A TypeBox Object to transform.
 * @returns a record of `parseArgs` option descriptors.
 */
export function toParseArgsOptions(schema: TObject) {
  return Object.fromEntries(
    Object.entries(schema.properties).map(([key, value]) => [
      key,
      toParseArgsOption(value),
    ]),
  );
}
