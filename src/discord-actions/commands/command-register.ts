import { commands } from "./commands";

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { action, ...rest } = command;
        return rest;
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
