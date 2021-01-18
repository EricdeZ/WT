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
      <div id="indexImages" style="display: flex; justify-content: space-around; flex-wrap: wrap; "></div>
  `;

  let indexDiv = document.getElementById("indexImages")
  entry.images.forEach(image => {
    indexDiv.innerHTML += `<img src="${image.data}" alt="Image" style="max-width: 20%; height: auto; border: #F87F4A groove 4px; margin: 4px">`
  })

}

ContentBoxView.showEntries = function (entries) {
  const contentBox = document.getElementById("contentBox");
  for (let i = 0; i < entries.length; i++) {
    if (i === 0) {
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

ContentBoxView.showEditEntry = function (formInput, useDefault) {
  let contentBox = document.getElementById("contentBox");
  contentBox.innerHTML = `
    <div class="row d-flex align-items-start " style="height: 100%">
      <div class="container bg-light">
        <h1 class="mb-4">Your Entry</h1>
        <form action="" method="POST" id="editEntryForm">
          <input type="hidden" name="editEntryFormSlug" value="${formInput.slug}">
          <div class="form-group">
              <label for="title">Title</label>
              <input required type="text" name="title" id="title" class="form-control" placeholder="Enter a title..."/>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea required name="description" id="description" class="form-control" placeholder="Write a description..."></textarea>
          </div>
          <div class="form-group">
            <label for="markdown">Text</label>
            <textarea required name="markdown" id="markdown" class="form-control" placeholder="Write about something..."></textarea>
          </div>
          <div id="oldImages">
          <textarea name="uploadList" id="uploadList" hidden></textarea>
          </div>
          <div class="row upload-row d-flex justify-content-center" style="margin: 20px"> 
            <div class="col-bg-6 dropzone">
              <label for="images" class="custom-upload" id="drag-drop">Drag and Drop or</label>
              <label for="images" class="custom-upload" id="custom-upload">BROWSE</label>
              <input type="file" id="images" name="images" multiple accept="image/*">
            </div> 
            <div class="col-bg-6 uploads-zone">
            List of Uploads
            <hr class="solid">
            <ul id="oldList" class="fileList"></ul>
            <ul id="nameList" class="fileList"></ul>
            <div id="ListDelete" style="visibility: hidden">
            <button class="btn btn-primary delete-img-btn" id="nameListDelete">DELETE</button>
            </div>
            </div>
          </div>
          
          <div class="row canvas-row" style="margin: 20px"> 
            <div class="col-2 tools">
                <div class="color-picker">
                <input class="colors" value="#000000" type="color" id="colorChange" name="colorChange">
                </div>
                <div class="slidecontainer thickness">
                    <label for="thickness" class="thickness-label" id="thickness-label">5</label>
                    <input type="range" min="1" max="50" value="5" class="slider" id="thickness">
                </div>
                <button class="btn undo-btn" id="undo-btn"></button>
                <button class="btn undo-btn redo-btn" id="redo-btn"></button>
                <button class="btn clear-btn save-btn" id="save-btn"></button>
                <button class="btn clear-btn" id="clear-btn"></button>
            </div>
            <div class="col-10 canvas">
            <canvas id="canvas"></canvas>
            </div>
          </div>
          
          <a href="/" class="btn btn-secondary" style="margin: 20px">CANCEL</a>
          <button type="submit" class="btn btn-primary" style="margin: 20px">SAVE</button>

        </form>
      </div>
    </div>`

  let form = document.getElementById("editEntryForm");
  if (!useDefault) {
    form.elements["title"].value = formInput.title
    form.elements["description"].value = formInput.description
    form.elements["markdown"].value = formInput.markdown
    form.elements["uploadList"].value = JSON.stringify(formInput.images)
    for (let i = 0; i < formInput.images.length; i++) {
      let image_id = "image" + i
      document.getElementById('oldList').innerHTML += `<li class="fileList" id=${image_id}>${formInput.images[i].originalName}</li>`;
      document.getElementById('ListDelete').style.visibility = 'visible'
    }
  }
}

ContentBoxView.showAddEntry = function (formInput, useDefault) {
  let contentBox = document.getElementById("contentBox");
  contentBox.innerHTML = `
    <div class="row d-flex align-items-start " style="height: 100%">
      <div class="container bg-light">
        <h1 class="mb-4">Your Entry</h1>
        <form action="" method="POST" id="addEntryForm">
          <div class="form-group">
              <label for="title">Title</label>
              <input required type="text" name="title" id="title" class="form-control" placeholder="Enter a title..."/>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea required name="description" id="description" class="form-control" placeholder="Write a description..."></textarea>
          </div>
          <div class="form-group">
            <label for="markdown">Text</label>
            <textarea required name="markdown" id="markdown" class="form-control" placeholder="Write about something..."></textarea>
          </div>
          
          <div class="row upload-row d-flex justify-content-center" style="margin: 20px"> 
            <div class="col-bg-6 dropzone">
              <label for="images" class="custom-upload" id="drag-drop">Drag and Drop or</label>
              <label for="images" class="custom-upload" id="custom-upload">BROWSE</label>
              <input type="file" id="images" name="images" multiple accept="image/*">
            </div> 
            <div class="col-bg-6 uploads-zone">
            List of Uploads
            <hr class="solid">
            <ul id="nameListAdd" class="fileList"></ul>
            </div>
          </div>
          
          <div class="form-check">
            <input type="checkbox" name="publicCheckbox" id="publicCheckbox" checked class="form-check-input"/>
            <label class="form-check-label" for="publicCheckbox">Public Entry</label>
          </div>
          
          <div class="row canvas-row" style="margin: 20px"> 
            <div class="col-2 tools">
                <div class="color-picker">
                <input class="colors" value="#000000" type="color" id="colorChange" name="colorChange">
                </div>
                <div class="slidecontainer thickness">
                    <label for="thickness" class="thickness-label" id="thickness-label">5</label>
                    <input type="range" min="1" max="50" value="5" class="slider" id="thickness">
                </div>
                <button class="btn undo-btn" id="undo-btn"></button>
                <button class="btn undo-btn redo-btn" id="redo-btn"></button>
                <button class="btn clear-btn save-btn" id="save-btn"></button>
                <button class="btn clear-btn" id="clear-btn"></button>
            </div>
            <div class="col-10 canvas">
            <canvas id="canvas"></canvas>
            </div>
          </div>
          
          <a href="/" class="btn btn-secondary" style="margin: 20px">CANCEL</a>
          <button type="submit" class="btn btn-primary" style="margin: 20px">SAVE</button>

        </form>
      </div>
    </div>`

  let form = document.getElementById("addEntryForm");
  if (!useDefault) {
    form.elements["title"].value = formInput.title
    form.elements["description"].value = formInput.description
    form.elements["markdown"].value = formInput.markdown
  }
}


ContentBoxView.resetContentBox = function () {

  const contentBox = document.getElementById("contentBox");

  contentBox.innerHTML = `
    <h1>Welcome to your blog!</h1>
    <button class="btn btn-homepage" id="welcomeButton">SHOW ENTRIES</button>
  `
}