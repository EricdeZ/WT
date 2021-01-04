ContentBoxView = function () {}

ContentBoxView.showIndex = function (entry) {
  let contentBox = document.getElementById("contentBox");

  contentBox.innerHTML = `
    <h1 class="mb-4">${entry.title}</h1>
      <div class="text-muted mb-2">
        ${(new Date(entry.createdAt).toLocaleDateString())}
      </div>
      <button onclick="" id="homePageButton" class="btn btn-secondary">HomePage</button>
      <button onclick="" id="deleteButton" class="btn btn-secondary">Delete</button>
      <div>${entry.sanitizedHtml}</div>
  `;

  /*let xmlhttp = new XMLHttpRequest();
  let url = "http://localhost:5000/views/showIndex";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      contentBox.innerHTML = this.responseText.toString()
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();*/
  //$("#contentBox").load("../../public/views/_form_fields.html");

}

ContentBoxView.showEntries = function (entries) {
  const contentBox = document.getElementById("contentBox");
  for (var i = 0; i < entries.length; i++) {
    if (i == 0) {
      contentBox.innerHTML = ``
    }
    contentBox.innerHTML += `
        <div class="card mt-4">
            <div class="card-body">
            <h4 class="card-title">${entries[i].title}</h4>
        <div class="card-subtitle text-muted mb-2">
        ${(new Date(entries[i].createdAt).toLocaleDateString())}
        </div>
        <div>${entries[i].sanitizedHtml}</div>
        <a href="" class="btn btn-info">
            Edit
        </a>
        <form action="/entries/${entries[i].slug}?_method=DELETE" class="d-inline" method="POST">
            <button type="submit" class="btn btn-danger">Delete</button>
        </form>
        </div>
        </div>
        </div>
    `;
  }
}

ContentBoxView.showEditEntry = function (formData) {
  let contentBox = document.getElementById("contentBox")
  contentBox.innerHTML = `
    <div class="row align-items-center">
        <div class="col-lg-4 text-light">
          <h1>-BlogTitle</h1>
        </div>
     </div>
     <div class="row" style="height: 100%">
        <div class="container bg-light p-4">
          <h1 class="mb-4">Edit Entry</h1>
          <form action="" method="POST" id="editEntryForm" enctype="multipart/form-data">
            <input type="hidden" name="editEntryFormSlug" value="${formData.slug}">
            <div class="form-group">
                <label for="title">Title</label>
                <input required type="text" value=${formData.title} name="title" id="title" class="form-control"/>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea required type="text" name="description" id="description" class="form-control">${formData.description}</textarea>
            </div>
            <div class="form-group">
              <label for="markdown">MarkDown</label>
              <textarea required type="text" name="markdown" id="markdown" class="form-control">${formData.markdown}</textarea>
            </div>

            <a href="/" class="btn btn-secondary">Cancel</a>
            
            <button type="submit" class="btn btn-primary">Save</button>

          </form>
        </div>
      </div>`;
}

ContentBoxView.showAddEntry = function (formInput) {
  let contentBox = document.getElementById("contentBox");
  contentBox.innerHTML = `
    <div class="row align-items-center">
        <div class="col-lg-4 text-light">
          <h1>-BlogTitle</h1>
        </div>
    </div>
    <div class="row" style="height: 100%">
      <div class="container bg-light p-4">
        <h1 class="mb-4">Your Entry</h1>
        <form action="" method="POST" id="addEntryForm">
          <div class="form-group">
              <label for="title">Title</label>
              <input required type="text" value=${formInput.title} name="title" id="title" class="form-control"/>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea required type="text" name="description" id="description" class="form-control">${formInput.description}</textarea>
          </div>
          <div class="form-group">
            <label for="markdown">MarkDown</label>
            <textarea required type="text" name="markdown" id="markdown" class="form-control">${formInput.markdown}</textarea>
          </div>
          <div class="form-check">
              <input type="checkbox" name="publicCheckbox" id="publicCheckbox" checked class="form-check-input"/>
              <label class="form-check-label" for="publicCheckbox">Public Entry</label>
          </div>

          <a href="/" class="btn btn-secondary">Cancel</a>
          <button type="submit" class="btn btn-primary">Save</button>

        </form>
      </div>
    </div>`
}

ContentBoxView.resetContentBox = function () {

  const contentBox = document.getElementById("contentBox");

  contentBox.innerHTML = `
    <h1>Welcome to your blog!</h1>
    <button class="btn btn-success" id="welcomeButton">Show Entries</button>
  `
}