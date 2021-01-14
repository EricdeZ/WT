CanvasView = function() {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let drawing = false;
    let x = 0;
    let y = 0;
    canvas.height = 500;
    canvas.width = 800;

    const color = document.getElementById('colorChange');
    const thickness = document.getElementById('thickness');
    const undoButton = document.getElementById('undo-btn');
    const redoButton = document.getElementById('redo-btn');

    let undoArray = [];
    let indexUndo = -1;
    let redoArray = [];
    let indexRedo = -1;
    disableButtons();

//drawing function
    function drawLine(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.lineWidth = thickness.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = color.value;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    function disableButtons() {
        document.getElementById('undo-btn').disabled = true;
        document.getElementById('redo-btn').disabled = true;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        undoArray = [];
        indexUndo = -1;
        redoArray = [];
        indexRedo = -1;
        disableButtons();
    }

// event.offsetX and Y gives the offset from the top left of the canvas.
    CanvasView.prototype.canvasOnMouseDown = function (e) {
        x = e.offsetX;
        y = e.offsetY;
        drawing = true;
    }

    CanvasView.prototype.canvasOnMouseMove = function (e) {
        if (drawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    }

    CanvasView.prototype.canvasOnMouseUp = function (e) {
        if (drawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            drawing = false;
            undoArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            indexUndo++;
            undoButton.disabled = indexUndo <= -1
        }
    }

    CanvasView.prototype.thicknessOnChange = function (e) {
        document.getElementById('thickness-label').innerHTML = thickness.value;
    }

    CanvasView.prototype.clearButtonOnClick = function (e) {
        var result = confirm('Are you sure you want to delete your masterpiece?');
        if(result){
            clearCanvas();
        }
    }

    CanvasView.prototype.undoButtonOnClick = function (e) {
        if(indexUndo < 0) {
            clearCanvas();
        }
        if(indexUndo === 0) {
            redoArray.push(undoArray.pop());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            indexRedo++;
            indexUndo--;
        } else {
            indexUndo--;
            redoArray.push(undoArray.pop());
            indexRedo++;
            ctx.putImageData(undoArray[indexUndo], 0, 0);
        }
        redoButton.disabled = indexRedo <= -1;
        undoButton.disabled = indexUndo <= -1;
    }

    CanvasView.prototype.redoButtonOnClick = function () {
        if(indexRedo > -1) {
            ctx.putImageData(redoArray[indexRedo], 0, 0);
            indexRedo--;
            undoArray.push(redoArray.pop());
            indexUndo++;
            redoButton.disabled = indexRedo <= -1;
            undoButton.disabled = indexUndo <= -1;
        }
    }
}