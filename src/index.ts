import { verifyDiscordMiddleware } from "./middleware/verify-middleware";
import commandController from "./controller/command.controller";
import { createFactory } from "hono/factory";
import { registerCommands } from "./shared/register-command";
import { getDiscordApplicationURL } from "./config/configs";
import { Env } from "./shared/hono-env";

const factory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const applicationId = c.env.DISCORD_APPLICATION_ID;
      const token = c.env.DISCORD_TOKEN;
      const url = getDiscordApplicationURL(applicationId);
      await registerCommands({ url, token });
      await next();
    });
  },
});

const app = factory.createApp();
app.get("/", (c) => {
  console.log(c.env);
  return c.text(`👋 ${c.env.DISCORD_APPLICATION_ID}`);
});
app.use(verifyDiscordMiddleware());
app.route("/", commandController);

export default app;
