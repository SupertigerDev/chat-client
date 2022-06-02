import { makeAutoObservable, runInAction } from "mobx";
import { NavigateFunction } from "react-router-dom";

export interface Tab {
  title: string;
  iconName?: string;
  path: string;
  subName?: string;
  userId?: string;
  serverId?: string;
  opened: boolean;
}

export class TabStore {
  
  tabs: Tab[];
  lastPath?: string;

  constructor() {
    makeAutoObservable(this);
    this.tabs = [];
  }
  
  isTabOpened(path: string) {
    return this.tabs.find(tab => tab.path === path);
  }
  openTab(tab: Omit<Tab, 'opened'>, navigate: NavigateFunction, select = true) {
    runInAction(() => {
      const tabAlreadyOpened = this.isTabOpened(tab.path);
      if (tabAlreadyOpened) {
        select && this.selectTab(tab.path, navigate);
        return;
      };
  
      const unopenedTabIndex = this.tabs.findIndex(t => !t.opened);
      if (unopenedTabIndex >= 0) {
        this.tabs[unopenedTabIndex] = {...tab, opened: false};
      } else {
        this.tabs.push({...tab, opened: false});
      }
  
      select && this.selectTab(tab.path, navigate);
    })
  }
  updateTab(path: string, tab: Partial<Tab>) {
    const tabIndex = this.tabs.findIndex(t => t.path === path);
    if (tabIndex >= 0) {
      this.tabs[tabIndex] = { ...this.tabs[tabIndex], ...tab };
    }
  }

  selectTab(path: string, navigate: NavigateFunction) {
    runInAction(() => {
      const tab = this.tabs.find(tab => tab.path === path);
      if (!tab) return;

      if (!this.lastPath) {
        this.lastPath = tab.path;
        return;
      }

      if (this.lastPath === tab.path) return 
      this.lastPath = tab.path;
      navigate(tab.path);
    });
  }
  
  closeTab(path: string) {
    this.tabs = this.tabs.filter(tab => tab.path !== path);
  }

}