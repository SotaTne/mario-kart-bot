import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Hono } from "hono";
import { verifyDiscordGuard } from "../guard/verify-discord.guard";
import { CommandDispatcherUseCase } from "../usecase/command-dispatcher.usecase";

const app = new Hono();

app.use(verifyDiscordGuard());
app.post("/", async (c, next) => {
  const message = await c.req.json();

  // ディスコードにサーバーの存在を伝える
  if (message.type === InteractionType.PING) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return c.json({
      type: InteractionResponseType.PONG,
    });
  }
  if (message.type === InteractionType.APPLICATION_COMMAND) {
    const action = CommandDispatcherUseCase({ message });
    return (await action(c)) as unknown as Response;
  }

  await next();
});

export default app;
