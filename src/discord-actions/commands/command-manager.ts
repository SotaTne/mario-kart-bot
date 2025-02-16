import { CommandEntity } from "../../domain/entity/discord-actions/commands/command.entity";
import { ICommandManager } from "../../domain/interface/discord-actions/commands/command-manager.interface";
import { HelloCommand } from "./hello.command";

const commands: CommandEntity[] = [HelloCommand];

export const CommandManager: ICommandManager = {
  findCommand: function (name: string): CommandEntity | undefined {
    return commands.find((command) => command.name === name);
  },
  registerCommands: async function ({
    url,
    token,
  }: {
    url: string;
    token: string;
  }): Promise<Response> {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(
        commands.map((command) => {
          const { name, description } = command;
          return { name, description };
        }),
      ),
    });

    if (response.ok) {
      console.log("Registered all commands");
    } else {
      console.error("Error registering commands");
      const text = await response.text();
      console.error(text);
    }
    return response;
  },
};
