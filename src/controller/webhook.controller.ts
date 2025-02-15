import { Hono } from "hono";
import { findWebhook } from "../discord-actions/webhook";
import { HTTPException } from "hono/http-exception";
import { verifyWebhookGuard } from "../guard/verify-webhook.guard";

const app = new Hono();

// webhook/:webhook-name に対してのリクエストを処理する
app.use(verifyWebhookGuard()); // Tokenとかの検証を行いたい
app.post("/:webhook-name", async (c) => {
  const reqName = c.req.param("webhook-name");
  const body = await c.req.json();
  const webhook = findWebhook(reqName);
  if (webhook) {
    const action = webhook.action(body);
    return (await action(c)) as unknown as Response;
  }
  throw new HTTPException(404, { message: "Webhook not found" });
});

export default app;
