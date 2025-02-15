import { MiddlewareHandler } from "hono";
import { Env } from "../shared/hono-env";
import { verifyKey } from "discord-interactions";
import { HTTPException } from "hono/http-exception";

export function verifyDiscordGuard(): MiddlewareHandler<Env> {
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
      throw new HTTPException(401, { message: "Invalid request signature" });
    }
    await next();
  };
}
