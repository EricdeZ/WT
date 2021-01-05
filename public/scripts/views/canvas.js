Canvas = function() {}

Canvas.loadCanvas = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let drawing = false;
    let x = 0;
    let y = 0;
    canvas.height = 200;
    canvas.width = 700;
//drawing function
    function drawLine(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
// event.offsetX and Y gives the offset from the top left of the canvas.
    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        drawing = true;
    });
    canvas.addEventListener('mousemove', e => {
        if (drawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });
    window.addEventListener('mouseup', e => {
        if (drawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            drawing = false;
        }
    });
}