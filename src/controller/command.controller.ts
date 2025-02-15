import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Hono } from "hono";
import { commands } from "../commands/commands";

const app = new Hono();

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
    for (const command of commands) {
      if (command.name === message.data.name) {
        const action = command.action(message);
        return action(c, next);
      }
    }
    return c.json(
      {
        error: "Command not found",
      },
      400,
    );
  }
  await next();
});

export default app;
