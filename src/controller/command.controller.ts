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
    const command = commands.find((cmd) => cmd.name === message.data.name);

    if (!command) {
      return c.json({ error: "Command not found" }, 400);
    }
    try {
      const action = command.action(message);
      return (await action(c)) as unknown as Response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
      return c.json({ error: "Failed to execute command" }, 500);
    }
  }
  await next();
});

export default app;
