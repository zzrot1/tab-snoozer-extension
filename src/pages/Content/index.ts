if (process.env.NODE_ENV !== 'production') {
  console.log('Content script works!');
}

export interface IPageContent {
  title: string;
  url: string;
  description?: string;
}

const extractPageContent = () => {
  const title = document.title;
  const url = window.location.href;

  let description: string | undefined = undefined;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    description = metaDescription.getAttribute('content') || '';
  }

  return {
    title,
    url,
    description,
  };
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageInfo') {
    const pageContent: IPageContent = extractPageContent();
    sendResponse({ info: pageContent });
  }
});
