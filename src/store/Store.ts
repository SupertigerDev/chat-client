import { MessageStore } from "./MessageStore";
import { TabStore } from "./TabStore";
import { WindowPropertyStore } from "./WindowPropertyStore";

class Store {
  tabStore: TabStore;
  messageStore: MessageStore;
  windowPropertyStore: WindowPropertyStore;
  constructor() {
    this.tabStore = new TabStore();
    this.messageStore = new MessageStore();
    this.windowPropertyStore = new WindowPropertyStore();
  }
}
export const store = new Store();