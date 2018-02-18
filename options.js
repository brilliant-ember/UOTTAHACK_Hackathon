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
        blocker: true,
        timer: false

    }, function(value) {
        chrome.storage.sync.set({blocker: value['blocker']});
        chrome.storage.sync.set({timer: value['timer']});
        blockingState(value['blocker']);
        timerState(value['timer']);

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
            cat_img_src: "cat/kitty_block.gif",
            title: "Kitty will Blocks all Distraction, so you can be a productive cookie"
        }
    }

    document.getElementById("state").innerHTML    = options.state;
    document.getElementById("title-img").src      = options.cat_img_src;
    document.getElementById("title-h1").innerHTML = options.title;
}

function timerState(state) {

    if (state) {
        document.getElementById("timer-text").style.visibility  = 'hidden';
        document.getElementById("timer-input").style.visibility = 'hidden';
        document.getElementById("go-button").style.visibility   = 'hidden';
        document.getElementById("timer-word").style.visibility  = 'hidden';

    } else {
        document.getElementById("timer-text").style.visibility  = 'visible';
        document.getElementById("timer-input").style.visibility = 'visible';
        document.getElementById("go-button").style.visibility   = 'visible';
        document.getElementById("timer-word").style.visibility  = 'visible';

    }
}

function activate_timer() {
    // hides toggle button and starts timer
    // preventing user from turining off
    // until seconds have passed
    //

    let timestring = document.getElementById("timer-input").value;

    if (timestring != "") {
        let time = parseFloat(timestring) * 60000;
        document.getElementById("timer-input").value = "";

        document.getElementById("title-button").style.visibility = 'hidden';
        chrome.storage.sync.set({blocker: true});
        blockingState(true);
        timerState(true);

        setTimeout(function() {
            document.getElementById("title-button").style.visibility = 'visible';
            chrome.storage.sync.set({blocker: false});
            blockingState(false);
            timerState(false);
        }, time);
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('title-button').addEventListener('click', save_options);
document.getElementById('go-button').addEventListener('click', activate_timer);
