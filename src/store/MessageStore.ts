import { Message, MessageType } from "chat-api/build/common/Message";
import { ServerChannel } from "chat-api/build/store/Channels";
import { makeAutoObservable, runInAction } from "mobx";
import { client } from "../common/client";


export enum MessageSentStatus {
    SENDING = 0,
    FAILED = 1,
}

export class LocalMessage extends Message {
  tempId?: string;
  sentStatus?: MessageSentStatus;
  constructor(messageRaw: any) {
    super(messageRaw);
    makeAutoObservable(this);
  }
}


export class MessageStore {

  channelMessages: Record<string, LocalMessage[]> = {}

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
      channel: channel._id,
      content,
      createdAt: Date.now(),
      sentStatus: MessageSentStatus.SENDING,
      type: MessageType.CONTENT,
      createdBy: {
        _id: user._id,
        username: user.username,
        tag: user.tag,
        hexColor: user.hexColor,
      },
    }
    this.pushMessage(channel._id, localMessage);

    const message: void | LocalMessage = await channel.sendMessage(content).catch(() => {
      console.log("failed to send message");
    });
    runInAction(() => {
      const index = this.channelMessages[channel._id].findIndex(m => m.tempId === tempMessageId);
      if (!message) {
        this.channelMessages[channel._id][index].sentStatus = MessageSentStatus.FAILED;
        return;
      }
      message.tempId = tempMessageId;
      this.channelMessages[channel._id][index] = message;
    })
  }
}