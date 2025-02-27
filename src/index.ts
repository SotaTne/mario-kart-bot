import { createFactory } from "hono/factory";
import { HonoEnv } from "./shared/hono-env";
import RouterApp from "./controller/router";
import { RegisterCommandUseCase } from "./usecase/register-command.usecase";

let isCommandsRegistered = false;

const factory = createFactory<HonoEnv>({
  initApp: (app) => {
    app.use(async (c, next) => {
      if (isCommandsRegistered) {
        await next();
      } else {
        await RegisterCommandUseCase(c);
        isCommandsRegistered = true;
        await next();
      }
    });
  },
});

const app = factory.createApp();
app.route("/", RouterApp);

export default app;
