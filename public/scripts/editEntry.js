var currentEdit;

function editEntry(listItem) {
    currentEdit = listItem;
    let xmlhttp = new XMLHttpRequest();
    let url = "http://localhost:5000/entries/" + listItem.id;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var entry = JSON.parse(this.responseText);
            showEdit(entry);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function showEdit(entry) {
    const contentBox = document.getElementById("contentBox");
    contentBox.innerHTML = `
    <div class="row align-items-center">
        <div class="col-lg-4 text-light">
          <h1>-BlogTitle</h1>
        </div>
     </div>
     <div class="row" style="height: 100%">
        <div class="container bg-light p-4">
          <h1 class="mb-4">Edit Entry</h1>
          <form action="javascript:saveEditEntry()" method="POST" id="editEntryForm" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Title</label>
                <input required type="text" value=${entry.title} name="title" id="title" class="form-control"/>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea required type="text" name="description" id="description" class="form-control">${entry.description}</textarea>
            </div>
            <div class="form-group">
              <label for="markdown">MarkDown</label>
              <textarea required type="text" name="markdown" id="markdown" class="form-control">${entry.markdown}</textarea>
            </div>

            <a href="/" class="btn btn-secondary">Cancel</a>
            
            <button type="submit" class="btn btn-primary">Save</button>

          </form>
        </div>
      </div>`;
}

function saveEditEntry() {
    let xmlhttp = new XMLHttpRequest();
    let url = "http://localhost:5000/entries/edit" + currentEdit.id;
    const form = document.getElementById("editEntryForm");
    var formData = new FormData(form);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            i = 0;
            //Todo:

        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.send(formData);
}