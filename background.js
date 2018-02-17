// ***********
// main events
// ***********

let EXT_ID = 'oceibmiohadejaominokfpmimceifdmn';

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
        EXT_ID,             // app id
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
        var _url = "chrome-extension://"+ EXT_ID +"/main.html";
        chrome.tabs.create({ url: _url });

    } else {
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
              chrome.tabs.update(tab.id, {url: "chrome-extension://"+ EXT_ID +"/main.html"});
        });
    }
}

//
// storage
//

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

    chrome.storage.local.get("blocker", function (obj) {

        if (obj) {
            chrome.storage.local.set({'blocker': false});

        } else {
            chrome.storage.local.set({'blocker': true});
        }

    });
}

//
// messages
//

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("received message - background");
        sendResponse({farewell: "goodbye"});
    }
);



// end
