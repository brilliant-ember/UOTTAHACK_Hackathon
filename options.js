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
    // when told a value makes sure remaining page elements line up with that value
    //

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

    document.getElementById("state").innerHTML    = options.state;
    document.getElementById("title-img").src      = options.cat_img_src;
    document.getElementById("title-h1").innerHTML = options.title;
}

function activate_timer() {
    // hides toggle button and starts timer
    // preventing user from turining off
    // until seconds have passed
    //

    document.getElementById("title-button").style.visibility = 'hidden';
    chrome.storage.sync.set({blocker: true});
    blockingState(true);

    let seconds = parseInt(document.getElementById("seconds-input").value) * 1000;
    document.getElementById("seconds-input").value = "";

    setTimeout(function() {
        document.getElementById("title-button").style.visibility = 'visible';
        chrome.storage.sync.set({blocker: false});
        blockingState(false);
    }, seconds);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('title-button').addEventListener('click', save_options);
document.getElementById('go-button').addEventListener('click', activate_timer);
