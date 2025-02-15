import { H } from "hono/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action = (message: any, ...args: any) => H;
