import { EmbedBuilder, Message, TextChannel, User } from "discord.js";

export function getLogEmbedMessage(
  title: string,
  message: string,
  settimestamp: boolean,
  loglevel: "info" | "warn" | "error",
) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(message)
    .setColor(
      loglevel === "info" ? "Green" : loglevel === "warn" ? "Yellow" : "White",
    );
  if (settimestamp) {
    embed.setTimestamp();
  }

  return embed;
}

export function getSpamLogEmbed(user: User, messages: Message[]) {
  return new EmbedBuilder()
    .setTitle("連投検知")
    .setDescription(`${user.displayName} (<@${user.id}>) が複数チャンネルで連投しました`)
    .addFields([
      {
        name: "送信したチャンネル",
        value: `${messages.map(message => `ID:${message.channelId}`).join("\n")}`,
      },
      {
        name: "メッセージ内容",
        value: `${messages[0].content}`,
      }
    ])
    .setAuthor({
      name: user.displayName,
      iconURL: user.displayAvatarURL(),
    })
}