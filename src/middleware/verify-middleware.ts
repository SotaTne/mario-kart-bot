import { MiddlewareHandler } from "hono";
import { Env } from "../shared/hono-env";
import { verifyKey } from "discord-interactions";

export function verifyDiscordMiddleware(): MiddlewareHandler<Env> {
  return async (c, next) => {
    const signature = c.req.header("x-signature-ed25519");
    const timestamp = c.req.header("x-signature-timestamp");

    // リクエストボディを Uint8Array に変換
    const body = await c.req.raw.clone().text(); // ここはテキストで取得します
    const encoder = new TextEncoder();
    const bodyUint8Array = encoder.encode(body);

    const isValidRequest =
      signature &&
      timestamp &&
      verifyKey(bodyUint8Array, signature, timestamp, c.env.DISCORD_PUBLIC_KEY);

    if (!isValidRequest) {
      console.error("Invalid request signature");
      return c.text("Bad request signature", 401);
    }

    // 検証成功後、次の処理へ
    return await next();
  };
}
