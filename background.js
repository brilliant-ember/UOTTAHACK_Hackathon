




chrome.webRequest.onBeforeRequest.addListener(function(evt) {
    // intercept all browser requests and cancel them
    // redirect user to the extension main page

    deActivate_Listner();
    Activate_Listner();
    
    if(state){
    chrome.tabs.query(
        {currentWindow: true, active: true}, 
        function (tab) {
              chrome.tabs.update(tab.id, {url: "https://www.google.ca"});})
    }

    
}, {urls: ["<all_urls>"]}, ['blocking']);


function Activate_Listner(){
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', function(){state = true});
});
}

function deActivate_Listner(){
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', function(){state = false});
});
}