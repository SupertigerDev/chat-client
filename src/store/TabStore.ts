import { makeAutoObservable, runInAction } from "mobx";

export interface Tab {
  title: string;
  iconName?: string;
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
    runInAction(() => {
      const tabAlreadyOpened = this.tabs.find(_tab => _tab.path === tab.path);
      if (tabAlreadyOpened) {
        this.selectTab(tab.path);
        return;
      };
  
      const unopenedTabIndex = this.tabs.findIndex(t => !t.opened);
      if (unopenedTabIndex >= 0) {
        this.tabs[unopenedTabIndex] = {...tab, opened: false};
      } else {
        this.tabs.push({...tab, opened: false});
      }
  
      this.selectTab(tab.path);
    })
  }
  updateTab(path: string, tab: Partial<Tab>) {
    const tabIndex = this.tabs.findIndex(t => t.path === path);
    if (tabIndex >= 0) {
      this.tabs[tabIndex] = { ...this.tabs[tabIndex], ...tab };
    }
  }

  selectTab(path: string) {
    runInAction(() => {
      const tab = this.tabs.find(tab => tab.path === path);
      if (!tab) return;
      this.selectedTabPath = tab.path;
    });
  }
  
  closeTab(path: string) {
    this.tabs = this.tabs.filter(tab => tab.path !== path);
  }

}