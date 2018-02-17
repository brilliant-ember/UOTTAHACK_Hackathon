// Saves options to chrome.storage
function save_options() {
    chrome.storage.sync.get({
        blocker: true

    }, function(value) {
        chrome.storage.sync.set({blocker: !value['blocker']});
        blockingState(!value['blocker']);

    });
}

// Restores select box and checkbox state using the preferences
function restore_options() {

    // Use default value blocker = true
    chrome.storage.sync.get({
        blocker: true

    }, function(value) {
        chrome.storage.sync.set({blocker: value});
        blockingState(value['blocker']);

    });
}

function blockingState(value) {

    // default value = false
    let options = {
        state: "On",
        cat_img_src: "cat/cat_not_block.png",
        title: "Cat is Distracted..."
    };

    // alter options value = true
    if (value) {
        options = {
            state: "Off",
            cat_img_src: "cat/cat_will_block.png",
            title: "Cat will Blocks all Distraction"
        }
    }

    document.getElementById("state").innerHTML   = options.state;
    document.getElementById("cat-img").src       = options.cat_img_src;
    document.getElementById("page-h1").innerHTML = options.title;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('title-btn').addEventListener('click', save_options);
