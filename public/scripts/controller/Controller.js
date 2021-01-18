Controller = function(indexListController) {

  const models = new Models(this)
  const views = new Views(this, indexListController, models)
  models.setSessionStorageDefault()

  function XMLHttpRequestGet(url, callback) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        callback(this.responseText)
      } else if (this.readyState === 4 && this.status === 400) {
        callback(null)
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  function XMLHttpRequestPostForm(url, callback, form, params = {}) {
    let formData = new FormData(form);
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        callback(this.responseText, params)
      } else if (this.readyState === 4 && this.status === 400) {
        callback(null)
      }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.send(formData);
  }

  function XMLHttpRequestDelete(url, callback, params = {}) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        callback(this.responseText, params)
      } else if (this.readyState === 4 && this.status === 400) {
        alert("Entry could not be deleted!")
      }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.send();
  }


  Controller.prototype.handleResetRequest = function(transmittedData) {
    let url = "http://localhost:5000"
    views.handleResetRequest()
    if (transmittedData.pushState) {
      history.pushState(null, '', url);
    }
  }

  Controller.prototype.handleIndexRequestPublic = function(transmittedData) {
    let url = "http://localhost:5000/entries/" + transmittedData.indexElement.id;
    XMLHttpRequestGet(url, views.handleIndexRequest)
    if (transmittedData.pushState) {
      history.pushState(null, '', url);
    }
  }

  Controller.prototype.handleIndexRequestPrivate = function(transmittedData) {
    let url = "http://localhost:5000/entriesPrivate/" + transmittedData.indexElement.id;
    let entry = models.getEntryString([transmittedData.indexElement.id])
    views.handleIndexRequest(entry)
    if (transmittedData.pushState) {
      history.pushState(null, '', url);
    }
  }

  Controller.prototype.handleWelcomeButton = function(transmittedData) {
    let url = "http://localhost:5000/entries/getEntries";
    XMLHttpRequestGet(url, views.handleWelcomeButton)
    if (transmittedData.pushState) {
      history.pushState(null, '', "http://localhost:5000/getEntries");
    }
  }

  Controller.prototype.handleDeleteButton = function() {
    let currentEntry = models.getCurrentEntryJson()
    if (currentEntry.isPublic) {
      let url = "/entries/" + currentEntry.slug + "?_method=DELETE"
      XMLHttpRequestDelete(url, views.handleDeleteButton)
    } else {
      models.deleteEntry(currentEntry.slug)
      views.handleDeleteButton(JSON.stringify(currentEntry))
    }
    models.resetFormData(models.sessionKeys.currentEntry)
  }

  Controller.prototype.handleEditButton = function(transmittedData) {
    views.handleEditButton(transmittedData.formDataEdit)
    let editEntryForm = document.getElementById('editEntryForm');
    let oldSlug = editEntryForm.elements["editEntryFormSlug"].value;
    editEntryForm.addEventListener('submit', this.handleEditFormSubmit)
    if (transmittedData.pushState) {
      history.pushState(null, '', "http://localhost:5000/entries/edit/" + oldSlug);
    }
  }

  Controller.prototype.handleEditFormSubmit = function(e) {
    e.preventDefault()
    let editEntryForm = document.getElementById('editEntryForm');
    const oldSlug = editEntryForm.elements["editEntryFormSlug"].value;
    if(models.getSessionDataByKeyJson(models.sessionKeys.currentEntry).isPublic) {
      let url = "http://localhost:5000/entries/edit/" + oldSlug;
      XMLHttpRequestPostForm(url, views.handleEditFormSubmit, editEntryForm)
    } else {
      models.deleteEntry(oldSlug)
      models.savePrivateEntry(editEntryForm, views.handleEditFormSubmit)
    }

  }

  Controller.prototype.handleAddButton = function(transmittedData) {
    views.handleAddButton(transmittedData.formDataAdd)
    if (transmittedData.pushState) {
      history.pushState(null, '', "http://localhost:5000/add");
    }
  }

  Controller.prototype.handleAddFormSubmit = function(e) {
    e.preventDefault()
    let addEntryForm = document.getElementById('addEntryForm');
    if(addEntryForm.elements["publicCheckbox"].checked) {
      let url = "http://localhost:5000/entries";
      XMLHttpRequestPostForm(url, views.handleAddFormSubmit, addEntryForm)
    } else {
      models.savePrivateEntry(addEntryForm, views.handleAddFormSubmit)
    }

  }

  Controller.prototype.handleAddFormChanged = function(e) {
    let formInput = {
      title: e.target.form["title"].value,
      description: e.target.form["description"].value,
      markdown: e.target.form["markdown"].value
    }
    models.sessionSaveData(models.sessionKeys.addFormData, formInput)
  }

  Controller.prototype.handleEditFormChanged = function(e) {
    let formInput = {
        title: e.target.form["title"].value,
        description: e.target.form["description"].value,
        markdown: e.target.form["markdown"].value
      }
      models.sessionSaveData(models.sessionKeys.editFormData, formInput)
  }

  Controller.prototype.handleEditUploadListChanged = function() {
    let fileList = document.getElementById("images")
    document.getElementById('nameList').innerHTML = '';
    for (let i = 0; i < fileList.files.length; ++i) {
      let name = fileList.files.item(i).name;
      document.getElementById('nameList').innerHTML += `<li class="fileList" id=${"image" + i}>${name}</li>`;
    }
    document.getElementById('ListDelete').style.visibility = 'visible';
    let deleteButton = document.getElementById("nameListDelete");
    deleteButton.addEventListener('click', function(e) {
      e.preventDefault()
      this.deleteImageFromEditUploadList()
    }.bind(this));
  }

  Controller.prototype.deleteImageFromEditUploadList = function (e) {
    e.preventDefault();
    document.getElementById('ListDelete').style.visibility = 'hidden';
    document.getElementById('images').value = "";
    document.getElementById('nameList').innerHTML = '';
    document.getElementById('oldImages').innerHTML = '';
    document.getElementById('oldList').innerHTML = '';
  }

  Controller.prototype.handleUploadListChanged = function() {
    let fileList = document.getElementById("images")
    document.getElementById('nameList').innerHTML = '';
    for (let i = 0; i < fileList.files.length; ++i) {
      let name = fileList.files.item(i).name;
      document.getElementById('nameList').innerHTML += `<li class="fileList" id=${"image" + i}>${name}</li>`;
    }
    document.getElementById('ListDelete').style.visibility = 'visible';
    let deleteButton = document.getElementById("ListDelete");
    deleteButton.addEventListener('click', function(e) {
      e.preventDefault()
      deleteImageFromUploadList()
    }.bind(this));

    function deleteImageFromUploadList() {
      document.getElementById('ListDelete').style.visibility = 'hidden';
      document.getElementById('images').value = "";
      document.getElementById('nameList').innerHTML = '';
    }
  }

  Controller.prototype.registerEventListenerById = function (id, type, eventListener) {
    let element = document.getElementById(id)
    element.addEventListener(type, eventListener)
  }

  Controller.prototype.registerEventListenerByIdWithParameter = function (id, type, eventListener, parameter) {
    let element = document.getElementById(id)
    element.addEventListener(type, function () {
      eventListener(parameter)
    })
  }

  Controller.prototype.handleUrlChange = function (event) {

    let url = document.location.toString()
    let urlSplitted = url.split("/")
    let urlEnd = urlSplitted[urlSplitted.length - 1]
    let actionData = {
      indexElement : document.getElementById(urlEnd),
      pushState : false,
      formDataAdd : models.getSessionDataByKeyJson(models.sessionKeys.addFormData),
      formDataEdit : models.getSessionDataByKeyJson(models.sessionKeys.formDataEdit)
    }
    let routes = [
      { path: "http://localhost:5000/" , handler: this.handleResetRequest},
      { path: "http://localhost:5000/getEntries" , handler: this.handleWelcomeButton},
      { path: "http://localhost:5000/entries/" + urlEnd , handler: this.handleIndexRequestPublic},
      { path: "http://localhost:5000/entriesPrivate/" + urlEnd , handler: this.handleIndexRequestPrivate},
      { path: "http://localhost:5000/add" , handler: this.handleAddButton},
      { path: "http://localhost:5000/entries/edit/" + urlEnd , handler: this.handleEditButton},
    ];

    let matches = routes.map(route => {
      return {
        route: route,
        result: url === route.path
      };
    });

    let match = matches.find(match => match.result !== false);

    if (!match) {
      this.handleResetRequest(actionData)
    } else {
      match.route.handler(actionData)
    }

  }

}