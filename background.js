chrome.browserAction.onClicked.addListener(function(activeTab) {
    var _url = "chrome-extension://oceibmiohadejaominokfpmimceifdmn/main.html";
    chrome.tabs.create({ url: _url });
});

// TODO - get something that can detect when the user tries to navigate

chrome.webRequest.onBeforeRequest.addListener(function() {

    return {cancel: true};

}, {urls: ["<all_urls>"]}, ['blocking']);
