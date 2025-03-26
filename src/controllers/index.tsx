import { useEffect, useState } from 'react';
import { TabItem } from '../models/tabItem';
import { IPageContent } from '../pages/Content';
import { TabManager } from '../models/tabManager';

export const useTabController = () => {
  const [pageInfo, setPageInfo] = useState<IPageContent>();
  const [tabManager, setTabManage] = useState<TabManager>();

  useEffect(() => {
    if (pageInfo) {
      const currentTabItem = new TabItem(pageInfo.url, pageInfo.title);
      setTabManage(new TabManager(currentTabItem));
    }
  }, [pageInfo]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        if (tabId !== undefined) {
          chrome.tabs.sendMessage(
            tabId,
            { action: 'getPageInfo' },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else {
                setPageInfo(response.info);
              }
            }
          );
        }
      }
    });
  }, []);

  return {
    tabManager,
  };
};
