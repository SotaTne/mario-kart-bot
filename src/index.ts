import { createFactory } from "hono/factory";
import { registerCommands } from "./discord-actions/commands";
import { getDiscordApplicationURL } from "./config/configs";
import { Env } from "./shared/hono-env";
import RouterApp from "./controller/router";

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
app.route("/", RouterApp);

export default app;
