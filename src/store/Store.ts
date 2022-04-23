import { TabStore } from "./TabStore";

class Store {
  tabStore: TabStore;
  constructor() {
    this.tabStore = new TabStore(); 
  }
}
export const store = new Store();