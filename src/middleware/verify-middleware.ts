import { MiddlewareHandler } from "hono";
import { Env } from "../shared/hono-env";
import { verifyKey } from "discord-interactions";

export function verifyDiscordMiddleware(): MiddlewareHandler<Env> {
  return async (c, next) => {
    const signature = c.req.header("x-signature-ed25519");
    const timestamp = c.req.header("x-signature-timestamp");
    const body = await c.req.text();

    const isValidRequest =
      signature &&
      timestamp &&
      (await verifyKey(body, signature, timestamp, c.env.DISCORD_PUBLIC_KEY));

    if (!isValidRequest) {
      console.error("Invalid request signature");
      return c.text("Bad request signature", 401);
    }

    await next();
  };
}
