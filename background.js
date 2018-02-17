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

    // block if not on whitelist
    if ( !isWhiteList(evt.url) ) {

        // block if cat is active
        chrome.storage.sync.get({
            blocker: true

        }, function(value) {

            if (value['blocker']) {
                mainMenu(false); // redirects current page if cat not distracted
            }
        });
    }

}, {urls: ["<all_urls>"]}, ['blocking']);


// ****************
// helper functions
// ****************

function isWhiteList(url) {
    // check if url is on white list
    //

    let whiteList = [
        "fonts",            // css google font
        "style.css",        // extension styles
        "chrome-extension",  // extension pages
        "options"
    ];

    for (let i=0; i<whiteList.length; i++) {
        if (url.indexOf(whiteList[i]) != -1){ return true; }
    }
    return false;
}

function mainMenu(newTab) {

    if (newTab) {
        var _url = "main.html";
        chrome.tabs.create({ url: _url });

    } else {
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
              chrome.tabs.update(tab.id, {url: "main.html"});
        });
    }
}






// end
