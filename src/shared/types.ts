import type { Context, TypedResponse } from "hono";

export type Action = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any
) => (
  c: Context,
) =>
  | TypedResponse<{ type: number; data: Record<string, unknown> }>
  | Promise<TypedResponse<{ type: number; data: Record<string, unknown> }>>;
