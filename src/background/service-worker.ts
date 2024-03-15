console.log('this is service worker file')
chrome.management.getSelf(self => {
  console.log(self)
})

chrome.runtime.onMessage.addListener((message: any, _sender: any, _sendResponse: any): any => {
  if (message.action === 'addIframe') {
      // 向当前标签页发送消息，请求添加iframe
      chrome.tabs.query({active: true, currentWindow: true}, (tabs: any) => {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'addIframe'});
      });
  }
})