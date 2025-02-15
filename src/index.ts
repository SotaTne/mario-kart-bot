import { verifyDiscordMiddleware } from "./middleware/verify-middleware";
import commandController from "./controller/command.controller";
import { createFactory } from "hono/factory";
import { registerCommands } from "./shared/register-command";
import { getDiscordApplicationURL } from "./config/configs";
import { Env } from "./shared/hono-env";

let isCommandsRegistered = false;

const factory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      if (isCommandsRegistered) {
        await next();
      } else {
        const applicationId = c.env.DISCORD_APPLICATION_ID;
        const token = c.env.DISCORD_TOKEN;
        const url = getDiscordApplicationURL(applicationId);
        await registerCommands({ url, token });
        isCommandsRegistered = true;
        await next();
      }
    });
  },
});

const app = factory.createApp();
app.get("/", (c) => {
  console.log(c.env);
  return c.text(`hi 👋 ${c.env.DISCORD_APPLICATION_ID}`);
});
app.use(verifyDiscordMiddleware());
app.route("/", commandController);

export default app;
