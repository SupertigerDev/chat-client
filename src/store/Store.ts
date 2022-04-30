import { MessageStore } from "./MessageStore";
import { TabStore } from "./TabStore";

class Store {
  tabStore: TabStore;
  messageStore: MessageStore;
  constructor() {
    this.tabStore = new TabStore();
    this.messageStore = new MessageStore();
  }
}
export const store = new Store();