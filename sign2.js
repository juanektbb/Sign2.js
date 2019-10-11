//SYNTAX: Function runs right when it's created
(function(){

    //Tell the browser to perform animation
    window.requestAnimFrame = (function(callback){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    //Basic canvas features
    var canvas = document.getElementById("sign2js");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 1;

    //Mouse/cursor features
    var drawing = false;
    var mousePos = {
        x: 0,
        y: 0
    };
    var lastPos = mousePos;


    /******************************
            EVENT LISTENERS
    ******************************/
    /* COMPUTER EVENTS */
    //Click on canvas
    canvas.addEventListener("mousedown", function(e){
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }, false);

    //Release click from canvas
    canvas.addEventListener("mouseup", function(e){
        drawing = false;
    }, false);

    //Cursor move on canvas
    canvas.addEventListener("mousemove", function(e){
        mousePos = getMousePos(canvas, e);
    }, false);

    /* TABLET AND MOBILE EVENTS */
    //Start touch on canvas
    canvas.addEventListener("touchstart", function(e){
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var me = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    //End touch on canvas
    canvas.addEventListener("touchend", function(e){
        var me = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(me);
    }, false);

    //Touch moves on canvas
    canvas.addEventListener("touchmove", function(e){
        var touch = e.touches[0];
        var me = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);


    /************************
            FUNCTIONS
    ************************/
    //RETURN MOUSE POSITION
    function getMousePos(canvasDom, mouseEvent){
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        }
    }

    //RETURN THE TOUCH POSITION
    function getTouchPos(canvasDom, touchEvent){
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        }
    }

    //CANVAS ACTUAL PAINTING
    function renderCanvas(){
        if(drawing){
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    /* THIS FUNTIONS PREVENT SCROLLING THE SCREEN WHEN TOUCHING */
    document.body.addEventListener("touchstart", function(e){
        if(e.target == canvas){
            e.preventDefault();
        }
    }, false);

    document.body.addEventListener("touchend", function(e){
        if(e.target == canvas){
            e.preventDefault();
        }
    }, false);

    document.body.addEventListener("touchmove", function(e){
        if(e.target == canvas){
            e.preventDefault();
        }
    }, false);

    //DRAW AND CLEAR FUNCTIONS
    (function drawLoop(){
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

    function clearCanvas(){
        canvas.width = canvas.width;
    }

    /* FUNCTION TO DOWNLOAD THE FILE */
    function downloadURI(uri, name){
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }


    /******************************************* 
            DOM MANIPULATION STARTS HERE
    *******************************************/
    //CANVAS SET UP
    var sign2jsSave = document.getElementById("sign2js-save");
    var sign2jsClear = document.getElementById("sign2js-clear");

    //MODAL WINDOW
    var modalSign = document.getElementById("modalSign");
    var sigImage = document.getElementById("sign2js-preview");
    var confirmSign = document.getElementById("sign2js-confirm");
    var cancelSign = document.getElementById("sign2js-cancel");

    //Clear the canvas
    sign2jsClear.addEventListener("click", function(e){
        clearCanvas();
    }, false);

    //Save this canvas
    sign2jsSave.addEventListener("click", function(e){
        var dataUrl = canvas.toDataURL();
        sigImage.setAttribute("src", dataUrl);
        modalSign.style.display = "block";
    }, false);

    //Cancel save this signature
    cancelSign.addEventListener("click", function(e){
        clearCanvas();
        modalSign.style.display = "none";
    }, false);

    //Confirm save this signature
    confirmSign.addEventListener("click", function(e){
        var dataUrl = canvas.toDataURL();
        downloadURI(dataUrl, "helloWorld.png");
        modalSign.style.display = "none";
    }, false);

})();