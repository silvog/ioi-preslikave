var trackingInProgress = false;
var counterFrame = 0;
var counterTracked = 0;
var counterUntracked = 0;
var trackingTask = null;
var trackedFaceComplete = false;

var colorLeftGlobal = null;
var colorRightGlobal = null;
var colorAverageGlobal = null;
var colorLeftGlobalHEX = null;
var colorRightGlobalHEX = null;
var colorAverageGlobalHEX = null;

var userImageURL = null;

var userLocked = false;

var isSnapshotTaken = false;

var isOnPlaylist = false;
var tidPlaylist = null;

var continueToColorPickTimeout;

var audioInitialized = false;
var videoInitialized = false;

var mediaConstraints = {
    audio: true
};


$( document ).ready(function() {
    $("#startVideoButton").toggle(false);
});

function initialize() {
    faceTracker();
}

function initialize2() {
    captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    audioInitialized = true;

    $("#startVideoButton").toggle(audioInitialized);
    $("#startAudioButton").toggle(!audioInitialized);
}


function faceTracker() {
    console.log("Initiating face tracker");

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    trackedFaceComplete = false;

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    trackingTask = tracking.track('#video', tracker, {camera: true});
    videoInitialized = true;
    $("#startVideoButton").toggle(!videoInitialized);
    //hide startButton
    //$("#startVideoButton").hide();
    //$("#startAudioButton").hide();


    tracker.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        counterFrame++;
        if (event.data.length === 0) {
            trackingInProgress = false;

            // No objects were detected in this frame.
            counterUntracked++;
        } else {
            //context.clearRect(0, 0, canvas.width, canvas.height);
            counterTracked++;
            trackingInProgress = true;
            event.data.forEach(function (rect) {
                context.strokeStyle = '#FF530D';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Ubuntu';
                context.fillStyle = "#fff";
                //context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                //context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            });
        }

        if ( counterFrame > 120) {
            if (counterTracked > 100 && !trackedFaceComplete) { //OK to proceed

                if(tidPlaylist !== undefined && tidPlaylist !== null)
                    abortTimer(tidPlaylist);


                counterTracked = 0;
                counterFrame = 0;
                trackedFaceComplete = true;
                if (!isSnapshotTaken)
                    snapshot();
                $('#mainContent').load('introduction.html');

            }

            if(counterUntracked > 410){
                trackedFaceComplete = false;
                isSnapshotTaken = false;
                if(!isOnPlaylist){
                    if(continueToColorPickTimeout !== undefined)
                        stopTimeout(continueToColorPickTimeout);
                    $('#mainContent').load('colorNamePlaylist.html');

                }
                counterUntracked = 0;
                counterTracked = 0;
            }

            if (counterFrame > 500) {
                counterFrame = 0;
                counterTracked = 0;
            }
        }

    });

}

function stopTracking() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    if (trackingTask !== null) {
        trackingTask.stop();
        context.clearRect(0, 0, canvas.width, canvas.height);

    }
    var video = document.getElementById('video');

}

function showStream() {
    var video = document.getElementById('video');
    //video.src = "";
    if (video.src && video.src !== "") {
        try {
            video.src = window.URL.createObjectURL(tracking.localStream);
        } catch (err) {
            console.log("There has been an error during stream placing!");
        }
    } else {
        console.log("Video already has a source stream!");
    }
}

function snapshot() {
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    if (tracking.localStream) {
        ctx.drawImage(video, 0, 0, 320, 240);
        
        userImageURL = canvas.toDataURL();
        isSnapshotTaken = true;
    }
}


