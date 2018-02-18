console.log("I am running");
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', main);
});




function main() {

    
chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
              chrome.tabs.update(tab.id, {url: "http://brilliant-wolf.tech"});
        });

}