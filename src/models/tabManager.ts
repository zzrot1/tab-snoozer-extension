import { TabItem } from './tabItem';

export class TabManager {
  constructor(private readonly newTab: TabItem) {}

  private getTabUrl() {
    return this.newTab.getProcessedUrl();
  }

  private saveNewTab() {
    // localStorage.setItem(this.newTab.getProcessedUrl())
  }
}
