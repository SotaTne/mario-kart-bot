import { createFactory } from "hono/factory";
import { Env } from "./shared/hono-env";
import { getDiscordApplicationURL } from "./config/configs";
import { CommandManager } from "./infra/discord-actions/commands/command-manager";
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
        const commandManager = CommandManager;
        await commandManager.registerCommands({ url, token });
        isCommandsRegistered = true;
        await next();
      }
    });
  },
});

const app = factory.createApp();
app.route("/", RouterApp);

export default app;
