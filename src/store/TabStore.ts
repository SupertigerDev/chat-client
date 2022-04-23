import { makeAutoObservable } from "mobx";

export interface Tab {
  title: string;
  path: string;
  userId?: string;
  serverId?: string;
  opened: boolean;
}

export class TabStore {
  
  tabs: Tab[];
  selectedTabPath: string | undefined;

  constructor() {
    makeAutoObservable(this);
    this.tabs = [];
  }
  
  openTab(tab: Omit<Tab, 'opened'>) {
    const tabAlreadyOpened = this.selectTab(tab.path);
    if (tabAlreadyOpened) return;

    const unopenedTabIndex = this.tabs.findIndex(t => !t.opened);
    if (unopenedTabIndex >= 0) {
      this.tabs[unopenedTabIndex] = {...tab, opened: false};
    } else {
      this.tabs.push({...tab, opened: false});
    }

    this.selectTab(tab.path);
  }

  selectTab(path: string) {
    const tab = this.tabs.find(tab => tab.path === path);
    if (!tab) return false;
    this.selectedTabPath = tab.path;
    return true;
  }
  
  closeTab(path: string) {
    this.tabs = this.tabs.filter(tab => tab.path !== path);
  }

}