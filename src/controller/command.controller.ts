import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Hono } from "hono";
import { verifyDiscordGuard } from "../guard/verify-discord.guard";
import { HonoEnv } from "@/shared/hono-env";
import { CommandManager } from "@/infra/discord-actions/commands/command-manager";

const app = new Hono<HonoEnv>();

app.use(verifyDiscordGuard());
app.post("/", async (c, next) => {
  const message = await c.req.json();
  switch (message.type) {
    case InteractionType.PING:
      // The `PING` message is used during the initial webhook handshake, and is
      // required to configure the webhook in the developer portal.
      return c.json({
        type: InteractionResponseType.PONG,
      });

    // commandAction
    case InteractionType.APPLICATION_COMMAND: {
      const responseJson = (await (
        await CommandManager.runCommand({
          c,
          commandName: message.data.name,
          bodyJson: message,
          guildId: message.guild_id,
        })
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .json()) as any;
      return c.json(responseJson);
    }

    // otherAction
    case InteractionType.MESSAGE_COMPONENT:
    case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE:
    case InteractionType.MODAL_SUBMIT: {
      const responseJson = (await (
        await CommandManager.runCommand({
          c,
          commandName: message.data.name,
          bodyJson: message,
          guildId: message.guild_id,
        })
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .json()) as any;
      return c.json(responseJson);
    }
  }

  await next();
});

export default app;
