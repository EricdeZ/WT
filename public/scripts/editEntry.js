let currentEdit;

const dompurify = require("dompurify");

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
    const form = document.getElementById("editEntryForm");
    let formData = new FormData(form);
    let xmlhttp1 = new XMLHttpRequest();
    let url1 = "http://localhost:5000/entries/edit/" + currentEdit.id;
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const contentBox = document.getElementById("contentBox");
            //$("#contentBox").load("../../public/views/_form_fields.html");
            contentBox.innerHTML = `
    <h1 class="mb-4">${form.body.title}</h1>
      <div class="text-muted mb-2">
        ${Date.now().toLocaleDateString()}
      </div>
      <a href="/" class="btn btn-secondary">HomePage</a>
      <div>${dompurify.sanitize(marked(form.body.markdown))}></div>
  `;
        }
    };
    xmlhttp1.open("POST", url1, true);
    xmlhttp1.send(formData);


}