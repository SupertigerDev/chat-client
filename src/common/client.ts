import { Client } from "chat-api";
import { store } from "../store/Store";

export const client = new Client();

client.on("messageCreated", message => {
  store.messageStore.pushMessage(message.channel, message);
})

client.on("messageDeleted", data => {
  store.messageStore.deleteMessage(data.channelId, data.messageId);
})