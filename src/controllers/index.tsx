import { useEffect, useState } from 'react';
import { TabItem } from '../models/tabItem';
import { IPageContent } from '../pages/Content';

export const useTabController = () => {
  const [pageInfo, setPageInfo] = useState<IPageContent>();

  console.log('page infod', pageInfo);
  // useEffect(() => {
  //   if (pageInfo) {
  //     const tabItem = new TabItem(pageInfo.url, pageInfo.title);
  //   } else {
  //     throw new Error('Oops there is no page info for some reason...');
  //   }
  // }, [pageInfo]);

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

  return 'test';
};
