import { Message } from "chat-api/build/common/Message";
import { ServerChannel } from "chat-api/build/store/Channels";
import { makeAutoObservable, runInAction } from "mobx";
import { client } from "../common/client";


export interface LocalMessage {
  _id: string;
  tempId: string;
  channelId: string;
  content: string;
  createdBy: {
    _id: string;
    username: string;
    tag: string;
    hexColor: string;
  };
  createdAt: number;
}



const type = Message

export class MessageStore {

  channelMessages: Record<string, (Message | LocalMessage)[]> = {}

  constructor() {
    makeAutoObservable(this);
  }
  pushMessage(channelId: string, message: Message | LocalMessage) {
    const messages = this.channelMessages[channelId];
    if (!messages) return;
    messages.push(message);
  }
  async loadChannelMessages(channel: ServerChannel, force = false) {
    if (!force && this.channelMessages[channel._id]) return;
    const messages = await channel.getMessages();
    runInAction(() => {
      this.channelMessages[channel._id] = messages;
    })
  }
  async sendMessage(channel: ServerChannel, content: string) {

    const user = client.account.user;
    if (!user) return;

    const tempMessageId = `${Date.now()}-${Math.random()}`;

    const localMessage: LocalMessage = {
      _id: "",
      tempId: tempMessageId,
      channelId: channel._id,
      content,
      createdAt: Date.now(),
      createdBy: {
        _id: user._id,
        username: user.username,
        tag: user.tag,
        hexColor: user.hexColor,
      },
    }
    this.pushMessage(channel._id, localMessage);

    const message = await channel.sendMessage(content);
    message.tempId = tempMessageId;
    runInAction(() => {
      const index = this.channelMessages[channel._id].findIndex(m => m.tempId === tempMessageId);
      this.channelMessages[channel._id][index] = message;
    })
  }
}