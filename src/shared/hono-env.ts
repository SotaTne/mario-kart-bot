export type HonoEnv = {
  Bindings: {
    DISCORD_APPLICATION_ID: string;
    DISCORD_TOKEN: string;
    DISCORD_PUBLIC_KEY: string;
    DB: D1Database;
    DISCORD_BOT_EXTENSION: Fetcher;
  };
};
