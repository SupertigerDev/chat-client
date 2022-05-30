import { makeAutoObservable } from "mobx";


export class WindowPropertyStore {
  width: null | number = window.innerWidth;
  mainPaneWidth: null | number = null;

  constructor() {
    makeAutoObservable(this);
    
    window.addEventListener('resize', () => {
      this.updateWidth(window.innerWidth);
    })
  }
  updateWidth(val: number) {
    this.width = val;
  }
  updateMainPaneWidth(val: number) {
    this.mainPaneWidth = val;
  }
}