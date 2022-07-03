chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  });
});


// TODO (Ivan): 怎么让这个提示能够针对当前 tab 处理，而不是全局
// browserAction 这里没有生效
chrome.action.onClicked.addListener(function(tab) {
  const message = ({tabId: tab.id, title: "You are on tab:" + tab.id});
  chrome.tabs.sendMessage(tab.id!, message, function(value) {
    chrome.browserAction.setBadgeText({
      text: value ? 'ON': 'OFF',
    })
  })
});
