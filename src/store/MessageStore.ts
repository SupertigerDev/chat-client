import { Message } from "chat-api/build/common/Message";
import { ServerChannel } from "chat-api/build/store/Channels";
import { makeAutoObservable, runInAction } from "mobx";

export class MessageStore {

  channelMessages: Record<string, Message[]> = {}

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
}