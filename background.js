
chrome.webRequest.onBeforeRequest.addListener(function(evt) {
    // intercept all browser requests and cancel them
    // redirect user to the extension main page


   
    chrome.tabs.query(
        {currentWindow: true, active: true}, 
        function (tab) {
              chrome.tabs.update(tab.id, {url: "https://www.google.ca"});})
    

    
}, {urls: ["<all_urls>"]}, ['blocking']);


function Activate_Listner(){
    
}