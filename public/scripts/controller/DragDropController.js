DragDropController = function () {

    DragDropController.prototype.loadDragDrop = function () {
        const dropzone = document.getElementById('dropzone');

        const dragDropView = new DragDropView();

        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, dragDropView.preventDefaults, false)
        });

        ;['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, dragDropView.highlight, false)
        });

        ;['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, dragDropView.unhighlight, false)
        });

        dropzone.addEventListener('drop', e => {
            dragDropView.handleDrop(e);
        });
    }
}