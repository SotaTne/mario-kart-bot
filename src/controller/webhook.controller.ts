import { Hono } from "hono";
import { verifyWebhookGuard } from "../guard/verify-webhook.guard";
import { WebhookDispatcherUsecase } from "../usecase/webhook-dispatcher.usecase";

const app = new Hono();

// webhook/:webhook-name に対してのリクエストを処理する
app.use(verifyWebhookGuard()); // Tokenとかの検証を行いたい
app.post("/:webhook-name", async (c) => {
  const reqName = c.req.param("webhook-name");
  const body = await c.req.json();
  const action = await WebhookDispatcherUsecase({
    webhookName: reqName,
    body,
    c,
  });
  return action;
});

export default app;
