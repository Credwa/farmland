StateEnum = {
    INITIAL : 0,
    ADDING_IMAGE : 4,
    DRAWING_MODE : 1,
    DRAWING : 2,
    DRAGGING : 3,
    PLACING_MARKER : 5
}

var imageArray = [];
var xPer = null;
var yPer = null;

var menu1 = $('.top-bar');
var menu2 = $('.main-nav');
var page_holder = $('#page-data');

function addImage(event){
    document.getElementById("importImage").click();
    event.stopPropagation();
    saveImage();
}

function toggleDraw(event){
    switch (state){
        case StateEnum.INITIAL:
        case StateEnum.DRAGGING:
            state = StateEnum.DRAWING_MODE;
            document.getElementById('pencilFunctionIcon').style.color = "#882222";
            break;
        case StateEnum.DRAWING_MODE:
        case StateEnum.DRAWING:
            state = StateEnum.INITIAL;
            document.getElementById('pencilFunctionIcon').style.color = "black";
            break;
    }
    event.stopPropagation();
}



 function saveImage(){
    if (addedImage){
        var downloadImage = addedImageCanvas.toDataURL('image/png', 1.0);
        imageArray.push(downloadImage);
        console.log('Added to Array');
        // var post = $('#functionIcons').data('post');

        // $.ajax({
        // type: "POST",
        // url: 'http://oxrpts.farmlandmedia.com/wp-admin/admin-ajax.php',
        // data: {
        // action: 'send_data2',
        // imgBase64: downloadImage,
        // post_id: post,
        // }
        // });


        // var downloadLink = document.getElementById('downloadCanvasLink');
        // downloadLink.setAttribute('download', 'download.png');
        // downloadLink.href = downloadImage;
        // downloadLink.click();

        // document.getElementById('pencilFunctionIcon').style.color = "black";
        // showHideIcon(IconEnum.PENCIL, false);
        // showHideIcon(IconEnum.SAVE_IMAGE, false);
        // state = StateEnum.PLACING_MARKER;
    }
}




 function saveImage2(){
    if (addedImage){
        var downloadImage = addedImageCanvas.toDataURL('image/png', 1.0);
        imageArray.push(downloadImage);
        console.log('Added to Array Yay');
        // var post = $('#functionIcons').data('post');

        // $.ajax({
        // type: "POST",
        // url: 'http://oxrpts.farmlandmedia.com/wp-admin/admin-ajax.php',
        // data: {
        // action: 'send_data2',
        // imgBase64: downloadImage,
        // post_id: post,
        // }
        // });


        var downloadLink = document.getElementById('downloadCanvasLink');
        downloadLink.setAttribute('download', 'download.png');
        downloadLink.href = downloadImage;
        //downloadLink.click();

        document.getElementById('pencilFunctionIcon').style.color = "black";
        showHideIcon(IconEnum.PENCIL, false);
        showHideIcon(IconEnum.SAVE_IMAGE, false);
        state = StateEnum.PLACING_MARKER;
    }
}









function showHideIcon(icon, enabled){
    var element = null;
    switch (icon){
        case IconEnum.PENCIL:
            element = document.getElementById('pencilFunctionIcon');
            break;
        case IconEnum.ADD_IMAGE:
            element = document.getElementById('addImageIcon');
            break;
        case IconEnum.SAVE_IMAGE:
            element = document.getElementById('saveImageIcon');
            break;
    }
    if (element){
        if (enabled){
            element.classList.remove('icon-disabled');
        }else{
            element.classList.add('icon-disabled');
        }
    }
}

function sendMarkerToServer(){
    var markerInfo = { x : marker.x, y : marker.y };
    /*
    $.ajax({
        url: ...,
        type: 'POST'
        success: ...,
        error: ...,
        dataType: 'json',
        data: JSON.stringify(markerInfo)
    });*/
}




function sendData(event){
 console.log('SEND DATA');
 console.log('Photo Array Length: '+imageArray.length);

 $('.loader-holder').css('display','block');
 $('#loading-text').text('Uploading Notes');

 var jsonString = JSON.stringify(imageArray);
 var post = $('#functionIcons').data('post');
 var text_note = $('#photo-text-input').val();

 console.log('Note: '+text_note);
 console.log('Post id: '+post);

 $.ajax({
        type: "POST",
        url: 'http://oxrpts.farmlandmedia.com/wp-admin/admin-ajax.php',
        data: {
        action: 'send_data2',
        images: jsonString,
        note: text_note,
        mapx: xPer,
        mapy: yPer,
        post_id: post,
        },
        success: function(html){
            console.log('Success: '+html);
            $('#loading-text').text(html);
            //$('.loader-holder').css('display','none');

            TweenLite.to(menu1, .75, {css:{top:0}, ease:Power3.easeOut});
            TweenLite.to(menu2, .75, {css:{bottom:0}, ease:Power3.easeOut,onComplete:loadHome});

            function loadHome(){
              console.log('Go Home');
              document.getElementById("home-btn").click();
            }

        }
    });


}


function morePhoto(event){

}

var text_status = 0;

function toggleText(event){

var photo_markup = $('#photo-markup');


if(text_status == 0){
   photo_markup.css('display','block');
   TweenLite.to(photo_markup, .5, {css:{opacity:1}, ease:Power3.easeOut,onComplete:loadNext});

    function loadNext(){
        //task_holder.css('display','none');
        text_status = 1;
        console.log('APPP');
    }
}else{

    TweenLite.to(photo_markup, .5, {css:{opacity:0}, ease:Power3.easeOut,onComplete:loadNext});

    function loadNext(){
        photo_markup.css('display','none');
        text_status = 0;
        console.log('APPP');
    }



}





}




function selectPhoto(event){

        function onSuccess(imageData) {
            alert('success');
            alert(imageData);
            var image2 = document.getElementById('myImage');
            image2.src = "data:image/jpeg;base64," + imageData;
            alert(image2.src);
        }

        function onFail(message) {
             alert('Failed because: ' + message);
        }

        if(typeof navigator !== 'undefined' && typeof navigator.camera !== 'undefined') {
             navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
                destinationType: Camera.DestinationType.DATA_URL
            });
        } else {
             alert('Something went wrong');
        }

}


function selectText(event){
    var task_holder = $('#task-start');
    TweenLite.to(task_holder, .5, {css:{opacity:0}, ease:Power3.easeOut,onComplete:loadNext});

    function loadNext(){
        task_holder.css('display','none');
        //addImage();
    }

}


function selectAudio(event){
    var task_holder = $('#task-start');
    TweenLite.to(task_holder, .5, {css:{opacity:0}, ease:Power3.easeOut,onComplete:loadNext});

    function loadNext(){
        task_holder.css('display','none');
        //addImage();
    }

}


function closeTask(event){

    TweenLite.to(menu1, .75, {css:{top:0}, ease:Power3.easeOut});
    TweenLite.to(menu2, .75, {css:{bottom:0}, ease:Power3.easeOut,onComplete:loadHome});

    function loadHome(){
        console.log('Go Home');
        document.getElementById("home-btn").click();
    }

}







function saveButtonPressed(event){

var photo_header = $('#functionIcons');
var photo_footer = $('#task-photo-footer');
var map_footer = $('#task-map-footer');

TweenLite.to(photo_header, .5, {css:{opacity:0}, ease:Power3.easeOut});
TweenLite.to(photo_footer, .5, {css:{opacity:0}, ease:Power3.easeOut,onComplete:loadNext});

function loadNext(){
    photo_header.css('display','none');
    photo_footer.css('display','none');
    map_footer.css('display','block');
    TweenLite.to(map_footer, .5, {css:{opacity:1}, ease:Power3.easeOut});

}

    switch (state){
        case StateEnum.PLACING_MARKER:
            if (marker.displayed){
                sendMarkerToServer();
            }
            break;
        default:
            saveImage2();
            break;
    }
    event.stopPropagation();
}

var state = StateEnum.INITIAL;
var marker;
var addedImage = null;
var addedImageCanvas = document.createElement('canvas');
var addedImageContext = addedImageCanvas.getContext('2d');

/*  BIG INTERNAL METHOD, CALLED AFTER THE UI HAS LOADED */
function bigmap(){
    var allowedExtensions = [".JPG", ".PNG", ".TIFF", ".TIF", ".SVG", ".JPEG", ".BMP" ];

    var mousePosition = {x : 0, y : 0 }
    var map = document.getElementById('sampleImage');

    // canvas: what's being shown right now
    var canvas = document.getElementById('viewport');
    var context = canvas.getContext('2d');

    // mapCanvas: behind the scenes canvas which holdes the complete image + drawings + etc
    var mapCanvas = document.createElement('canvas');
    var mapContext = mapCanvas.getContext('2d');

    marker = { image : document.getElementById('marker'), displayed : false, x : 0, y : 0 };
    var undrawnSegments = [];

    IconEnum = {
        PENCIL : 0,
        ADD_IMAGE : 1,
        SAVE_IMAGE : 2
    }

    /* The camera defines what is seen. Everything that will be drawn needs to be canged toCameraCoords.
       context.translate() is also an option but other operations are less intuitive in my opinion.
    */
    var camera = { x : 0, y : 0}
    function toCameraX(x){
        return x - camera.x;
    }

    function toCameraY(y){
        return y - camera.y;
    }

    function fromCameraX(x){
        return x + camera.x;
    }

    function fromCameraY(y){
        return y + camera.y;
    }

    canvas.onmousedown = function(event){
        captureMousePosition(event);
        mouseDown = true;
        mousePressed();
    }

    function mousePressed(){
        if (state == StateEnum.PLACING_MARKER){
            state = StateEnum.DRAGGING;
        }else if (state == StateEnum.DRAWING_MODE){
            state = StateEnum.DRAWING;
        }
    }

    canvas.onmouseup = canvasMouseUp;

    canvas.onclick = function(event){
        captureMousePosition(event);
        click();
    }

    function click(){
        /*
        switch (state){
            case StateEnum.ADDING_IMAGE:
                addedImageCanvas.position = {x : mousePosition.x - addedImage.width / 2, y : mousePosition.y - addedImage.height / 2};
                addedImageCanvas.width = addedImage.width;
                addedImageCanvas.height = addedImage.height;
                addedImageContext.drawImage(addedImage, 0, 0);
                state = StateEnum.INITIAL;

                showHideIcon(IconEnum.ADD_IMAGE, false);
                showHideIcon(IconEnum.PENCIL, true);
                showHideIcon(IconEnum.SAVE_IMAGE, true);
                break;
        }
        */
    }

    function canvasMouseUp(event){
        captureMousePosition(event);
        mouseDown = false;
        mouseUp();
    }

    function mouseUp(){
        switch (state){
            case StateEnum.DRAGGING:
                state = StateEnum.PLACING_MARKER;
                break;
            case StateEnum.DRAWING:
                state = StateEnum.DRAWING_MODE;
                break;
        }
    }

    document.onmousemove = function(event){
        if (!touch){
            var previousMouseX = mousePosition.x;
            var previousMouseY = mousePosition.y;
            var deltaX = event.clientX - mousePosition.x;
            var deltaY = event.clientY - mousePosition.y;
            captureMousePosition(event);

            moveCursor(previousMouseX, previousMouseY, deltaX, deltaY);
        }
    }

    function moveCursor(previousMouseX, previousMouseY, deltaX, deltaY){
        switch (state){
            case StateEnum.DRAGGING:
                camera.x -= deltaX;
                camera.y -= deltaY;
                constraintCamera();
                break;
            case StateEnum.DRAWING:
               undrawnSegments.push({ fromx : previousMouseX, fromy : previousMouseY, tox : mousePosition.x, toy : mousePosition.y });
               break;
        }
    }

    function constraintCamera(){
        camera.x = clamp(camera.x, 0, map.width - canvas.width);
        camera.y = clamp(camera.y, 0, map.height - canvas.height);
    }

    function captureMousePosition(event){
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;
    }

    function captureMousePositionTouch(event){
        event = event || window.event;
        mousePosition.x = event.touches[0].clientX;
        mousePosition.y = event.touches[0].clientY;
    }

    function captureMousePositionTouchMove(event){
        mousePosition.x = event.changedTouches[0].clientX;
        mousePosition.y = event.changedTouches[0].clientY;
    }

    function clamp(value, min, max){
        return Math.max(Math.min(value,max),min);
    }

    $(canvas).on('doubletap',function(event){
        captureMousePosition(event);

        doubleClick();
    });

    function doubleClick(){
        if (state == StateEnum.PLACING_MARKER || state == StateEnum.DRAGGING){
            marker.displayed = true;
            marker.x = mousePosition.x + camera.x;
            marker.y = mousePosition.y + camera.y;

            var imageElement = document.getElementById('sampleImage');
            var width = imageElement.naturalWidth;
            var height = imageElement.naturalHeight;

            var xPer = (marker.x / width ) * 100;
            var yPer = (marker.y / height) * 100;

            console.log('X%: '+ xPer);
            console.log('Y%: '+ yPer);

            showHideIcon(IconEnum.SAVE_IMAGE, true);
        }
    }

    canvas.ondblclick = function(event){
        captureMousePosition(event);

        doubleClick();
    }

    var touch = false;

    document.ontouchstart = function(event){
        touch = true;
        captureMousePositionTouch(event);
        mousePressed();
    }

    document.ontouchmove = function(event){
        event = event || window.event;
        var previousMouseX = mousePosition.x;
        var previousMouseY = mousePosition.y;
        captureMousePositionTouchMove(event);
        var deltaX = mousePosition.x - previousMouseX;
        var deltaY = mousePosition.y - previousMouseY;
        moveCursor(previousMouseX, previousMouseY, deltaX, deltaY);
    }

    document.ontouchend = function(event){
        captureMousePosition(event);
        mouseDown = false;
        mouseUp();
    }

    // file upload pluggin. Let's me grab an image by drag and drop and work with it clientside
    $('#importImage').fileupload({
        add: function(e, data){
            var imageReady = false;
            var file = data.files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            // read the file contents from disk
            fileReader.onloadend = function(){

                var fname = file.name;
                var extension = "";
                var extensionS = "";
                if (fname.includes(".")){ // Remove extension of file (if exists)
                    extensionS = fname.substring(fname.lastIndexOf("."));
                    extension = extensionS.toUpperCase();
                }

                // if the extension is not allowed
                if (extension == "" || allowedExtensions.indexOf(extension) == -1){
                    // fail silently.
                    return;
                }

                var dataURL = fileReader.result;
                addedImage = document.createElement('img');
                addedImage.src = dataURL;

                state = StateEnum.ADDING_IMAGE;

                addedImage.onload = function(){
                    var imageProportions = resizeImage(addedImage, canvas.width, canvas.height);

                    addedImageCanvas.position = {x : canvas.width / 2 - imageProportions.width / 2, y : canvas.height / 2 - imageProportions.height / 2};
                    addedImageCanvas.width = imageProportions.width;
                    addedImageCanvas.height = imageProportions.height;
                    addedImageContext.drawImage(addedImage, 0, 0, imageProportions.width, imageProportions.height);
                    state = StateEnum.INITIAL;

                    showHideIcon(IconEnum.ADD_IMAGE, false);
                    showHideIcon(IconEnum.PENCIL, true);
                    showHideIcon(IconEnum.SAVE_IMAGE, true);
                }
            }
        }
    });

    function drawMapCanvas(){
        mapCanvas.width = map.width;
        mapCanvas.height = map.height;
        mapContext.drawImage(map, 0, 0);
    }

    $(document).ready(function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        function main(){
            update();
            draw();
            requestAnimationFrame(main);
        }

        function update(){

        }

        function draw(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            if (addedImage && state != StateEnum.ADDING_IMAGE){
                addedImageContext.strokeStyle = "red";
                addedImageContext.lineWidth = 2;
                addedImageContext.beginPath();
                for (var i = 0; i < undrawnSegments.length; i++){
                    var segment = undrawnSegments[i];
                    var segmentFromX = fromCameraX(segment.fromx) - toCameraX(addedImageCanvas.position.x);
                    var segmentFromY = fromCameraY(segment.fromy) - toCameraY(addedImageCanvas.position.y);
                    var segmentToX = fromCameraX(segment.tox) - toCameraX(addedImageCanvas.position.x);
                    var segmentToY = fromCameraY(segment.toy) - toCameraY(addedImageCanvas.position.y);
                    addedImageContext.moveTo(segmentFromX, segmentFromY);
                    addedImageContext.lineTo(segmentToX, segmentToY);
                }
                addedImageContext.stroke();
            }
            undrawnSegments = [];


            switch (state){
                case StateEnum.ADDING_IMAGE:
                    context.save();
                    context.globalAlpha = 0.2;
                    context.drawImage(addedImage, mousePosition.x - addedImage.width / 2, mousePosition.y - addedImage.height / 2);
                    context.restore();
                    break;
                case StateEnum.PLACING_MARKER:
                case StateEnum.DRAGGING:
                    context.drawImage(map, toCameraX(0), toCameraY(0));
                    if (marker.displayed){
                        context.drawImage(marker.image, toCameraX(marker.x) - marker.image.width / 2, toCameraY(marker.y) - marker.image.height);
                    }
                    break;
                default:
                    if (addedImage){
                        context.drawImage(addedImageCanvas, toCameraX(addedImageCanvas.position.x), toCameraY(addedImageCanvas.position.y));
                    }
                    break;
            }
        }

        requestAnimationFrame(main);

        /*
        $("#takephoto").click(function() {
            // take snapshot and get image data
            Webcam.snap( function(data_uri) {
            // display results in page
            //document.getElementById('results').innerHTML = '<img width="400" height="240" src="'+data_uri+'"/>';
            make_base(data_uri);
        } );

        function make_base(data_uri){
            init();
            $( "#viewport" ).css('display','block');
            console.log("FOOOD");
            base_image = new Image();
            base_image.src = data_uri;
            base_image.onload = function(){
              //context.drawImage(base_image, 0, 0, 400, 320);
              ctx.drawImage(base_image, 0, 0);
            }
        }
        */
    });

    function resizeImage(selectedImage, maxWidth, maxHeight){
        var resize = { width : 0, height: 0 };
        if (maxWidth > selectedImage.width && maxHeight > selectedImage.height){
            resize.width = selectedImage.width;
            resize.height = selectedImage.height;
        }else if (maxWidth < selectedImage.width && maxHeight > selectedImage.height){
            resize.height = selectedImage.height  * maxWidth / selectedImage.width;
            resize.width = maxWidth;
        }else if (maxWidth > selectedImage.width && maxHeight < selectedImage.height){
            resize.width = selectedImage.width * maxHeight / selectedImage.height;
            resize.height = maxHeight;
        }else{
            // neither width or height are sufficient
            if ((selectedImage.width / maxWidth) > (selectedImage.height / maxHeight)){
                // width drives
                resize.width = maxWidth;
                resize.height = selectedImage.height * maxWidth / selectedImage.width;
            }else{
                resize.width = selectedImage.width * maxHeight / selectedImage.height;
                resize.height = maxHeight;
            }
        }
        return resize;
    }

    /*
    $("#retakephoto").click(function() {

        $( "#viewport" ).css('display','none');

    });
    */

    /*
     var flag = false,
            prevX = 0,
            currX = 0,
            prevY = 0,
            currY = 0,
            dot_flag = false;

        var x = "black",
            y = 2;

        function init() {
          console.log("DRRRRRAW");
            // canvas = document.getElementById('viewport');
            // ctx = canvas.getContext("2d");
            w = canvas.width;
            h = canvas.height;

            canvas.addEventListener("mousemove", function (e) {
                findxy('move', e)
            }, false);
            canvas.addEventListener("mousedown", function (e) {
                findxy('down', e)
            }, false);
            canvas.addEventListener("mouseup", function (e) {
                findxy('up', e)
            }, false);
            canvas.addEventListener("mouseout", function (e) {
                findxy('out', e)
            }, false);
        }

        function color(obj) {
            switch (obj.id) {
                case "green":
                    x = "green";
                    break;
                case "blue":
                    x = "blue";
                    break;
                case "red":
                    x = "red";
                    break;
                case "yellow":
                    x = "yellow";
                    break;
                case "orange":
                    x = "orange";
                    break;
                case "black":
                    x = "black";
                    break;
                case "white":
                    x = "white";
                    break;
            }
            if (x == "white") y = 14;
            else y = 2;

        }

        function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = x;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }

        function erase() {
            var m = confirm("Want to clear");
            if (m) {
                ctx.clearRect(0, 0, w, h);
                document.getElementById("canvasimg").style.display = "none";
            }
        }

        function save() {
            document.getElementById("canvasimg").style.border = "2px solid";
            var dataURL = canvas.toDataURL();
            document.getElementById("canvasimg").src = dataURL;
            document.getElementById("canvasimg").style.display = "inline";
        }

        function findxy(res, e) {
            if (res == 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;

                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = x;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res == 'up' || res == "out") {
                flag = false;
            }
            if (res == 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - canvas.offsetLeft;
                    currY = e.clientY - canvas.offsetTop;
                    draw();
                }
            }
        }



    });


    */



        // var canvas = document.getElementsByTagName('canvas')[0];

        // // canvas.width = window.innerWidth;
        // // canvas.height = window.innerHeight;

        // canvas.width = 1017;
        // canvas.height = 643;

        // var gkhead = new Image;

        // window.onload = function(){

        //      var ctx = canvas.getContext('2d');
        //      trackTransforms(ctx);

     //    function redraw(){

     //          // Clear the entire canvas
     //          var p1 = ctx.transformedPoint(0,0);
     //          var p2 = ctx.transformedPoint(canvas.width,canvas.height);
     //          ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

     //          ctx.save();
     //          ctx.setTransform(1,0,0,1,0,0);
     //          ctx.clearRect(0,0,canvas.width,canvas.height);
     //          ctx.restore();

     //          ctx.drawImage(gkhead,0,0);

     //        }
     //        redraw();

     //      var lastX=canvas.width/2, lastY=canvas.height/2;

     //      var dragStart,dragged;

     //      canvas.addEventListener('touchstart',function(evt){
     //          document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
     //          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
     //          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
     //          dragStart = ctx.transformedPoint(lastX,lastY);
     //          dragged = false;
     //      },false);

     //      canvas.addEventListener('touchmove',function(evt){
     //          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
     //          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
     //          dragged = true;
     //          if (dragStart){
     //            var pt = ctx.transformedPoint(lastX,lastY);
     //            ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
     //            redraw();
     //                }
     //      },false);

     //      canvas.addEventListener('touchend',function(evt){
     //          dragStart = null;
     //          if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
     //      },false);

     //      var scaleFactor = 1.1;

     //      var zoom = function(clicks){
     //          var pt = ctx.transformedPoint(lastX,lastY);
     //          ctx.translate(pt.x,pt.y);
     //          var factor = Math.pow(scaleFactor,clicks);
     //          ctx.scale(factor,factor);
     //          ctx.translate(-pt.x,-pt.y);
     //          redraw();
     //      }

     //      var handleScroll = function(evt){
     //          var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
     //          if (delta) zoom(delta);
     //          return evt.preventDefault() && false;
     //      };

     //      canvas.addEventListener('DOMMouseScroll',handleScroll,false);
     //      canvas.addEventListener('mousewheel',handleScroll,false);
        // };

        // gkhead.src = 'http://farmlandmedia.com/oxrpts/img/floorplan.jpg';

        // // Adds ctx.getTransform() - returns an SVGMatrix
        // // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
        // function trackTransforms(ctx){
     //      var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
     //      var xform = svg.createSVGMatrix();
     //      ctx.getTransform = function(){ return xform; };

     //      var savedTransforms = [];
     //      var save = ctx.save;
     //      ctx.save = function(){
     //          savedTransforms.push(xform.translate(0,0));
     //          return save.call(ctx);
     //      };

     //      var restore = ctx.restore;
     //      ctx.restore = function(){
     //        xform = savedTransforms.pop();
     //        return restore.call(ctx);
        //        };

     //      var scale = ctx.scale;
     //      ctx.scale = function(sx,sy){
     //        xform = xform.scaleNonUniform(sx,sy);
     //        return scale.call(ctx,sx,sy);
        //        };

     //      var rotate = ctx.rotate;
     //      ctx.rotate = function(radians){
     //          xform = xform.rotate(radians*180/Math.PI);
     //          return rotate.call(ctx,radians);
     //      };

     //      var translate = ctx.translate;
     //      ctx.translate = function(dx,dy){
     //          xform = xform.translate(dx,dy);
     //          return translate.call(ctx,dx,dy);
     //      };

     //      var transform = ctx.transform;
     //      ctx.transform = function(a,b,c,d,e,f){
     //          var m2 = svg.createSVGMatrix();
     //          m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
     //          xform = xform.multiply(m2);
     //          return transform.call(ctx,a,b,c,d,e,f);
     //      };

     //      var setTransform = ctx.setTransform;
     //      ctx.setTransform = function(a,b,c,d,e,f){
     //          xform.a = a;
     //          xform.b = b;
     //          xform.c = c;
     //          xform.d = d;
     //          xform.e = e;
     //          xform.f = f;
     //          return setTransform.call(ctx,a,b,c,d,e,f);
     //      };

     //      var pt  = svg.createSVGPoint();
     //      ctx.transformedPoint = function(x,y){
     //          pt.x=x; pt.y=y;
     //          return pt.matrixTransform(xform.inverse());
     //      }
    // }
}
