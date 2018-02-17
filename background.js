// ***********
// main events
// ***********

chrome.browserAction.onClicked.addListener(function(activeTab) {
    // when the extension icon is clicked launch the extensions
    // main page
    //

    /*
    chrome.storage.local.get("blocker", function (obj) {

        console.log(obj);

        if (obj == {}) { // value is unset
            //chrome.storage.local.set({'blocker': state});
            console.log("not defined - blocker");
        }
        console.log("defined - blocker");
    }); */

    //initStorage(true);
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

//
// storage
//

function initStorage(state) {
    // ensures storage value is init
    //

    chrome.storage.local.get("blocker", function (obj) {
        if (obj == {}) { // value is unset
            chrome.storage.local.set({'blocker': state});
        }
    });
}

function getBlockState(callback) {
    // returns true if pages should be blocked
    //

    chrome.storage.local.get("blocker", function (value) {
        callback(value); // calls callback with blockState
    });
}

function toggleBlockState() {
    // toggle block state
    //

    chrome.storage.local.get("blocker", function (value) {
        chrome.storage.local.set({'blocker': !value});
    });
}



// end
