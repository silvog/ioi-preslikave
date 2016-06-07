$(document).ready(function () {
    isOnPlaylist = false;
    var canvas = document.getElementById("canvasLeft");
    canvas.width = $("#canvasLeftParent").width();
    canvas.height = $("#canvasLeftParent").height();

    var canvas = document.getElementById("canvasRight");
    canvas.width = $("#canvasRightParent").width();
    canvas.height = $("#canvasRightParent").height();

    if (tracking.localStream == null) {
        console.log("STREAM NE OBSTAJA");
    } else {
        console.log("TRACKING STREAM:");
        console.log(tracking.localStream);

        var video = document.querySelector("#videoColorPick");
        video.src = window.URL.createObjectURL(tracking.localStream);
    }


});

$('#canvasLeft').colorSampler({
    onPreview: function (color) {
        $('#previewColorLeft').css('background-color', color);
    },
    onSelect: function (color) {
        $('#selectedColorLeft').css('background-color', color);

        var colorLeftHSV = $.xcolor.average(color, color).getHSV();
        var colorRightHSV = $.xcolor.average($('#selectedColorRight').css("background-color"), $('#selectedColorRight').css("background-color")).getHSV();

        colorLeftGlobal = colorLeftHSV;
        colorLeftGlobalHEX = $.xcolor.average(color, color).getHex();
        colorRightGlobal = colorRightHSV;
        colorRightGlobalHEX = $.xcolor.average($('#selectedColorRight').css("background-color"), $('#selectedColorRight').css("background-color")).getHex();

        //var avgColor = $.xcolor.average($('#selectedColorRight').css("background-color"), color);
        var avgColor = $.xcolor.average(colorLeftHSV, colorRightHSV);

        colorAverageGlobal = avgColor.getHSV();
        colorAverageGlobalHEX = avgColor.getHex();
        $('#averageColor').css('background-color', avgColor.getHSV());
    }
});


$('#canvasRight').colorSampler({
    onPreview: function (color) {
        $('#previewColorRight').css('background-color', color);
    },
    onSelect: function (color) {
        $('#selectedColorRight').css('background-color', color);

        var colorRightHSV1 = $.xcolor.average(color, color).getHSV();
        var colorLeftHSV1 = $.xcolor.average($('#selectedColorLeft').css("background-color"), $('#selectedColorLeft').css("background-color")).getHSV();

        colorLeftGlobal = colorLeftHSV1;
        colorLeftGlobalHEX = $.xcolor.average($('#selectedColorLeft').css("background-color"), $('#selectedColorLeft').css("background-color")).getHex();

        colorRightGlobal = colorRightHSV1;
        colorRightGlobalHEX = $.xcolor.average(color, color).getHex();
        //var avgColorR = $.xcolor.average($('#selectedColorLeft').css("background-color"), color);
        var avgColorR = $.xcolor.average(colorLeftHSV1, colorRightHSV1);

        colorAverageGlobal = avgColorR.getHSV();
        colorAverageGlobalHEX = avgColorR.getHex();

        $('#averageColor').css('background-color', avgColorR.getHSV());
    }
});


var canvasLeft = document.getElementById('canvasLeft');
var contextLeft = canvasLeft.getContext('2d');
var imageObjLeft = new Image();
imageObjLeft.src = "images/slika1.bmp";

var canvasRight = document.getElementById('canvasRight');
var contextRight = canvasRight.getContext('2d');
var imageObjRight = new Image();
imageObjRight.src = "images/slika2.bmp";

var fitImageOn = function (canvas, imageObj, context) {
    var imageAspectRatio = imageObj.width / imageObj.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;

    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width
        renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
        xStart = 0;
        yStart = (canvas.height - renderableHeight) / 2;
    }

    // Happy path - keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
    context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

imageObjLeft.onload = function () {
    fitImageOn(canvasLeft, imageObjLeft, contextLeft)
};

imageObjRight.onload = function () {
    fitImageOn(canvasRight, imageObjRight, contextRight)
};

function commenceNaming(){

    $('#mainContent').load('colorNaming.html');
    
}


