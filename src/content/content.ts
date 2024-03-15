console.log('this is content file --')

const init = () => {
  const addIframe = (id: string, pagePath: string) => {
    const contentIframe = document.createElement("iframe");
    contentIframe.id = id;
    contentIframe.style.cssText = "width: 400px; height: 400px; position: fixed; top: 0px; right: 0px; inset: 0px; z-index: 10000002; border: none;";
    const getContentPage = chrome.runtime.getURL(pagePath);
    contentIframe.src = getContentPage;
    document.body.appendChild(contentIframe);
  }
  // addIframe('content-start-iframe', 'iframe.html')
  addIframe('content-start-iframe', 'contentPage/index.html')
}

// 判断 window.top 和 self 是否相等，如果不相等，则不注入 iframe
if (window.top === window.self) {
  init();
}

chrome.runtime.onMessage.addListener((message: any, _sender, _sendResponse): any => {
  if (message.action === 'addIframe') {
      // 添加iframe到页面中
      const iframe = document.createElement('iframe');
      iframe.src = chrome.runtime.getURL('iframe.html');
      iframe.style.cssText = 'width: 400px; height: 400px; position: fixed; top: 0px; right: 0px; border: none; z-index: 9999; background-color: white;';
      document.body.appendChild(iframe);
  }
})