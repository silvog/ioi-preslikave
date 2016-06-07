$(document).ready(function () {
    $(".modal-backdrop").remove();
    isOnPlaylist = false;
    $("body").removeAttr("class");
    $("body").removeAttr("style");


    document.getElementById("userAvatarFaceNaming").src = userImageURL;
    document.getElementById("userAvatarFaceNaming").width = 240;
    document.getElementById("userAvatarFaceNaming").height = 180;
    
    
    if (colorLeftGlobal != null && colorRightGlobal != null
        && colorAverageGlobal != null) {
        $('#leftColorNaming').css('background-color', colorLeftGlobal);
        $('#rightColorNaming').css('background-color', colorRightGlobal);
        $('#averageColorNaming').css('background-color', colorAverageGlobal);

    }

    var timeToRecord = 7000;
    var bar = new ProgressBar.Line('#progressLine', {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: timeToRecord,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'}
    });

    $(this).delay(2000).queue(function () {
        recordAudio();
        bar.animate(1.0);  // Number from 0.0 to 1.0
        $(this).dequeue();
    });

    $(this).delay(12000 + timeToRecord).queue(function () {
        $('#mainContent').load('colorNamePlaylist.html');
    });

});

