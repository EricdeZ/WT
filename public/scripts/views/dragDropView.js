DragDropView = function () {

    const dropzone = document.getElementById('dropzone');

    DragDropView.prototype.preventDefaults = function (e){
        e.preventDefault();
        e.stopPropagation();
    }

    DragDropView.prototype.highlight = function (e){
        dropzone.classList.add('highlight');
    }

    DragDropView.prototype.unhighlight = function (e){
        dropzone.classList.remove('highlight');
    }

    DragDropView.prototype.handleDrop = function (e){
        let fileInput = document.getElementById("images");
        fileInput.files = e.dataTransfer.files;
        document.getElementById('nameList').innerHTML = '';
        for (let i = 0; i < fileInput.files.length; ++i) {
            let name = fileInput.files.item(i).name;
            document.getElementById('nameList').innerHTML += '<li class="fileList" id="image" + i>' + name + '</li>';
        }
        document.getElementById('ListDelete').style.visibility = 'visible';
        let deleteButton = document.getElementById("ListDelete");
        deleteButton.addEventListener('click', deleteImageFromUploadList);

        function deleteImageFromUploadList() {
            document.getElementById('ListDelete').style.visibility = 'hidden';
            document.getElementById('images').value = "";
            document.getElementById('nameList').innerHTML = '';
        }
    }

}