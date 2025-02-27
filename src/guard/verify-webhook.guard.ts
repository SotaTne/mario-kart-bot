import { MiddlewareHandler } from "hono";
import { HonoEnv } from "../shared/hono-env";
// import { HTTPException } from "hono/http-exception";

export function verifyWebhookGuard(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    await next();
  };
}
