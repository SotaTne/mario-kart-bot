import { MiddlewareHandler } from "hono";
import { Env } from "../shared/hono-env";
// import { HTTPException } from "hono/http-exception";

export function verifyWebhookGuard(): MiddlewareHandler<Env> {
  return async (c, next) => {
    await next();
  };
}
