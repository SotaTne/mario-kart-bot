import { ICommand } from "../../domain/interface/discord-actions/commands.interface";
import { HelloCommand } from "./hello.command";

export const commands = [HelloCommand];

export function findCommand(name: string): ICommand | undefined {
  return commands.find((command) => command.name === name);
}

export async function registerCommands({
  url,
  token,
}: {
  url: string;
  token: string;
}) {
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
}
