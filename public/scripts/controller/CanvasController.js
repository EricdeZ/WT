CanvasController = function() {

  CanvasController.prototype.loadCanvas = function () {
    const canvas = document.getElementById('canvas');
    const thickness = document.getElementById('thickness');
    const clearButton = document.getElementById('clear-btn');
    const undoButton = document.getElementById('undo-btn');
    const redoButton = document.getElementById('redo-btn');
    const saveButton = document.getElementById('save-btn');

    const canvasView = new CanvasView();

// event.offsetX and Y gives the offset from the top left of the canvas.
    canvas.addEventListener('mousedown', e => {
      canvasView.canvasOnMouseDown(e);
    });

    canvas.addEventListener('mousemove', e => {
      canvasView.canvasOnMouseMove(e);
    });

    window.addEventListener('mouseup', e => {
      canvasView.canvasOnMouseUp(e);
    });

    thickness.addEventListener('change', e => {
      canvasView.thicknessOnChange(e);
    });

    clearButton.addEventListener('click', e => {
      canvasView.clearButtonOnClick(e);
    });

    undoButton.addEventListener('click', e => {
      canvasView.undoButtonOnClick(e);
    });

    redoButton.addEventListener('click', e=> {
      canvasView.redoButtonOnClick(e);
    });

    saveButton.addEventListener('click', e =>{
      canvasView.saveButtonOnClick(e);
    });
  }
}