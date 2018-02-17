chrome.browserAction.onClicked.addListener(function(activeTab) {
    var _url = "chrome-extension://oceibmiohadejaominokfpmimceifdmn/main.html";
    chrome.tabs.create({ url: _url });
});

chrome.webRequest.onBeforeRequest.addListener(function(evt) {
    //
    // intercepts all browser requests and cancels them
    //

    // block all pages except for ui-pages belonging to this extension
    if ( !isWhiteList(evt.url) ) {

        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
              chrome.tabs.update(tab.id, {url: "chrome-extension://oceibmiohadejaominokfpmimceifdmn/main.html"});
        });

        // return {cancel: true}; // not required because of re-direction
    }

}, {urls: ["<all_urls>"]}, ['blocking']);

//
// helper functions
//
function loadMain() {
    chrome.tabs.getCurrent(function (tab) {
        console.log(tab.id);
        chrome.tabs.update(tab.id, {url: "chrome-extension://oceibmiohadejaominokfpmimceifdmn/main.html"});
    });
}

function isWhiteList(url) {
    // check if this url is on the white list

    let whiteList = [
        "oceibmiohadejaominokfpmimceifdmn",
        "fonts",
        "style.css"
    ];

    for (let i=0; i<whiteList.length; i++) {
        if (url.indexOf(whiteList[i]) != -1){ return true; }
    }
    return false;
}
