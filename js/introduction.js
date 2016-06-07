$(document).ready(function () {
    $('#videoRow').css("display", "none");
    isOnPlaylist = false;

    if (trackedFaceComplete) {
        function colorPickContent() {
            $('#mainContent').load('colorPick.html');
        }
    }

    continueToColorPickTimeout = setTimeout(colorPickContent, 30000);

});

function stopTimeout(myDelay) {
    clearTimeout(myDelay);
}
