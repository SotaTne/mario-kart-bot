// configには、副作用のない関数か定数のみを定義する
// 副作用のない関数はAllow関数として、関数型言語っぽく定義する

export const getDiscordApplicationURL = (applicationId: string): string =>
  `https://discord.com/api/v10/applications/${applicationId}/commands`;

export const getDiscordGuildURL = (
  applicationId: string,
  guildId: string,
): string =>
  `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`;
