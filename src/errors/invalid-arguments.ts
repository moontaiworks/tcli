import type { ValueError } from "@sinclair/typebox/errors";

export class InvalidArguments extends Error {
  constructor(errors: ValueError[]) {
    super("Invalid arguments", { cause: errors });
  }
}
