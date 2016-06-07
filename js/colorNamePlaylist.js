var seznamVnosov;
var seznam;
var stevec = 0;


$(document).ready(function () {
    $('#videoRow').css("display", "none");
    isOnPlaylist = true;
    if (colorLeftGlobal && colorRightGlobal && colorAverageGlobal) {
        $('#leftColorPlaylist').css('background-color', colorLeftGlobal);
        $('#rightColorPlaylist').css('background-color', colorRightGlobal);
        $('#averageColorPlaylist').css('background-color', colorAverageGlobal);

    }


    var audioPlaylist = document.getElementById("audioPlaylist");
    var timestampHolder = document.getElementById("timestampPlaylist");

    var fileLocation = "../../preslikave_uploads/";

    var xhrReq = new XMLHttpRequest();
    xhrReq.open('GET', '/preslikave/server/get_list.php');

    xhrReq.onreadystatechange = function () {
        if (xhrReq.readyState == 4 && xhrReq.status == 200) {

            seznamVnosov = xhrReq.responseText;

            if (seznamVnosov.length > 1){
                try {
                    seznamVnosov = JSON.parse(seznamVnosov);
                    seznam = seznamVnosov;
                }
                catch(err) {
                    console.log("Napaka pri pridobivanju podatkov");
                }
            }

            $('#neobstojeciVnosi').toggle( seznam === undefined || seznam.length === 0);
            $('#obstojeciVnosi').toggle( !(seznam === undefined || seznam.length === 0));
            
            if(!(seznam === undefined || seznam.length === 0)) {
                posodobiVsebino(0, seznam);

                tidPlaylist = setInterval(function () {
                    stevec++;
                    if (stevec >= seznam.length) stevec = 0;
                    posodobiVsebino(stevec, seznam);
                }, 20000);

                function posodobiVsebino(stevec, seznam) {
                    if (stevec >= seznam.length) {
                        stevec = 0;
                    }

                    $("#leftColorPlaylist").fadeOut(500, function () {
                        $('#leftColorPlaylist').css('background-color', seznam[stevec].levaBarva);
                    }).fadeIn(500);

                    $("#rightColorPlaylist").fadeOut(500, function () {
                        $('#rightColorPlaylist').css('background-color', seznam[stevec].desnaBarva);
                    }).fadeIn(500);

                    $("#averageColorPlaylist").fadeOut(500, function () {
                        $('#averageColorPlaylist').css('background-color', seznam[stevec].povprecnaBarva);
                    }).fadeIn(500);

                    $("#userAvatarFace").fadeOut(500, function () {
                        $("#userAvatarFace").attr("src", fileLocation + seznam[stevec].predpona + "_user.png");
                    }).fadeIn(500);

                    audioPlaylist.src = fileLocation + seznam[stevec].predpona + ".wav";

                    timestampHolder.innerHTML = seznam[stevec].cas;
                    audioPlaylist.load();
                    $(this).delay(2000).queue(function () {
                        audioPlaylist.play();
                        $(this).dequeue();
                    });

                }
            }

        }
    };

    xhrReq.send();
    
});

function abortTimer(timer) { // to be called when you want to stop the timer
    clearInterval(timer);
}
