
ContentBoxView = function () {}

ContentBoxView.showIndex = function (entry) {
  let contentBox = document.getElementById("contentBox");

  contentBox.innerHTML = `
    <h1 class="mb-4">${entry.title}</h1>
      <div class="text-muted mb-2">
        ${(new Date(entry.createdAt).toLocaleDateString())}
      </div>
      <button onclick="" id="homePageButton" class="btn btn-secondary" style="margin-bottom: 20px">HomePage</button>
      <button onclick="" id="deleteButton" class="btn btn-secondary" style="margin-bottom: 20px">Delete</button>
      <div style="text-align: left; font-weight: bold">${entry.description}</div>
      <div style="text-align: left">${entry.sanitizedHtml}</div>
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
    let readButtonId = "read-button" + entries[i].slug
    contentBox.innerHTML += `
        <div class="card mt-4">
            <div class="card-body">
            <h4 class="card-title">${entries[i].title}</h4>
        <div class="card-subtitle text-muted mb-2">
        ${(new Date(entries[i].createdAt).toLocaleDateString())}
        </div>
        <div style="text-align: left; font-weight: bold">${entries[i].description}</div> 
        <div style="text-align: left; display:-webkit-box; -webkit-box-orient:vertical; overflow: hidden; -webkit-line-clamp: 3">${entries[i].sanitizedHtml}</div>
        <button class="btn btn-homepage" id=${readButtonId}>READ</button>
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
              <label for="markdown">Text</label>
              <textarea required type="text" name="markdown" id="markdown" class="form-control">${formData.markdown}</textarea>
            </div>

            <a href="/" class="btn btn-secondary">CANCEL</a>
            
            <button type="submit" class="btn btn-primary">SAVE</button>

          </form>
        </div>
      </div>`;
}

ContentBoxView.showAddEntry = function (formInput) {
  let contentBox = document.getElementById("contentBox");
  contentBox.innerHTML = `
    <div class="row d-flex align-items-start " style="height: 100%">
      <div class="container bg-light">
        <h1 class="mb-4">Your Entry</h1>
        <div action="" method="POST" id="addEntryForm">
          <div class="form-group">
              <label for="title">Title</label>
              <input required type="text" name="title" id="title" class="form-control" placeholder="Enter a title..."/>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea required type="text" name="description" id="description" class="form-control" placeholder="Write a description..."></textarea>
          </div>
          <div class="form-group">
            <label for="markdown">Text</label>
            <textarea required type="text" name="markdown" id="markdown" class="form-control" placeholder="Write about something..."></textarea>
          </div>
          <div class="form-check">
              <input type="checkbox" name="publicCheckbox" id="publicCheckbox" checked class="form-check-input"/>
              <label class="form-check-label" for="publicCheckbox">Public Entry</label>
          </div>
          
          <div class="row upload-row d-flex justify-content-center" style="margin: 20px"> 
            <div class="col-bg-6 dropzone">
            <label for="image" class="custom-upload" id="drag-drop">Drag and Drop or</label>
            <label for="image" class="custom-upload" id="custom-upload">BROWSE</label>
            <input type="file" id="image"
                     name="image">
            
            </div>
            <div class="col-bg-6 uploads-zone">
            list of uploads is shown here
            </div>
          </div>
          
          <div class="row canvas-row" style="margin: 20px"> 
            <div class="col-1 tools">
            tools
                <div class="color-picker">
                <input class="colors" value="#F86323" type="color" id="colorChange" name="colorChange">
                </div>
<!--                <section class="thickness">
                    <input type="number" class="stroke-weight" value="3">
                </section>-->
            </div>
            <div class="col-11 canvas">
            <canvas id="canvas"></canvas>
            </div>
          </div>
          

         

          <a href="/" class="btn btn-secondary" style="margin: 20px">Cancel</a>
          <button type="submit" class="btn btn-primary" style="margin: 20px">Save</button>

        </form>
      </div>
    </div>`
  Canvas.loadCanvas();
}


ContentBoxView.resetContentBox = function () {

  const contentBox = document.getElementById("contentBox");

  contentBox.innerHTML = `
    <h1>Welcome to your blog!</h1>
    <button class="btn btn-homepage" id="welcomeButton">SHOW ENTRIES</button>
  `
}