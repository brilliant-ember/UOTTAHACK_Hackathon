// ***********
// main events
// ***********

chrome.browserAction.onClicked.addListener(function(activeTab) {
    // when the extension icon is clicked launch the extensions
    // main page
    //

    mainMenu(true); // true requests new tab
});

chrome.webRequest.onBeforeRequest.addListener(function(evt) {
    // intercept all browser requests and cancel them
    // redirect user to the extension main page
    //

    // don't block pages used by this extension
    if ( !isWhiteList(evt.url) ) {

        mainMenu(false); // redirects current page

    }

}, {urls: ["<all_urls>"]}, ['blocking']);


// ****************
// helper functions
// ****************

function blockState() {
    // returns true if pages should be blocked
    //

    // TODO
    return true;
}

function toggleBlockState() {
    // toggle block state
    //

    // TODO
}

function isWhiteList(url) {
    // check if url is on white list
    //

    let whiteList = [
        "oceibmiohadejaominokfpmimceifdmn", // app id
        "fonts",                            // css google font
        "style.css",                        // extension styles
        "chrome-extension"                  // extension pages
    ];

    for (let i=0; i<whiteList.length; i++) {
        if (url.indexOf(whiteList[i]) != -1){ return true; }
    }
    return false;
}

function mainMenu(newTab) {

    if (newTab) {
        var _url = "chrome-extension://oceibmiohadejaominokfpmimceifdmn/main.html";
        chrome.tabs.create({ url: _url });

    } else {
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
              chrome.tabs.update(tab.id, {url: "chrome-extension://oceibmiohadejaominokfpmimceifdmn/main.html"});
        });
    }
}
