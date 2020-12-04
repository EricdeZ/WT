function editEntry() {
    const contentBox = document.getElementById("contentBox");
    const entry = $('#contentBox').data('entryData');
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
            <input type="hidden" name="editEntryFormSlug" value="${entry.slug}">
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
    const oldSlug = form.elements["editEntryFormSlug"].value;
    let formData = new FormData(form);
    let xmlhttp1 = new XMLHttpRequest();
    let url = "http://localhost:5000/entries/edit/" + oldSlug;
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const entry = JSON.parse(this.responseText);
            showEditedEntry(entry, oldSlug);
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Error occured while saving Entry!");
        }
    };
    xmlhttp1.open("POST", url, true);
    xmlhttp1.send(formData);
}

function showEditedEntry(entry, oldSlug) {
    const indexList = document.getElementById("indexList");
    indexList.removeChild(indexList.children[oldSlug]);
    const newIndexEntry = document.createElement("li");
    newIndexEntry.setAttribute("class", "list-group-item-action index");
    newIndexEntry.setAttribute("id", entry.slug);
    newIndexEntry.setAttribute("onclick", "loadIndex(this)");
    newIndexEntry.innerHTML = `${entry.title}`;
    if (indexList.children.length > 0) {
        indexList.insertBefore(newIndexEntry, indexList.children[0]);
    } else {
        indexList.appendChild(newIndexEntry);
    }
    showIndex(entry)
}