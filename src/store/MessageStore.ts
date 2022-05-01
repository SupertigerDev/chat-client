import { Message } from "chat-api/build/common/Message";
import { ServerChannel } from "chat-api/build/store/Channels";
import { makeAutoObservable, runInAction } from "mobx";


export interface LocalMessage {
  _id: string;
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


export class MessageStore {

  channelMessages: Record<string, (Message | LocalMessage)[]> = {}

  constructor() {
    makeAutoObservable(this);
  }

  async loadChannelMessages(channel: ServerChannel, force = false) {
    if (!force && this.channelMessages[channel._id]) return;
    const messages = await channel.getMessages();
    runInAction(() => {
      this.channelMessages[channel._id] = messages;
    })
  }
  async sendMessage(channel: ServerChannel, content: string) {
    const tempMessageId = `${Date.now()}-${Math.random()}`;

    const localMessage: LocalMessage = {
      _id: tempMessageId,
      channelId: channel._id,
      content,
      createdAt: Date.now(),
      createdBy: {
        _id: Math.random().toString(),
        username: 'test',
        tag: 'test',
        hexColor: 'red',
      },
    }
    this.channelMessages[channel._id].push(localMessage);

    const message = await channel.sendMessage(content);
    runInAction(() => {
      const index = this.channelMessages[channel._id].findIndex(m => m._id === tempMessageId);
      this.channelMessages[channel._id][index] = message;
    })
  }
}