import { Hono } from "hono";
import commandController from "./command.controller";
import webhookController from "./webhook.controller";

const app = new Hono();
app.route("/discord", commandController);
app.route("/webhook", webhookController);

export default app;
