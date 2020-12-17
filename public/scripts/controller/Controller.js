Controller = function() {

  const views = new Views(this)
  const models = new Models(this)

  function XMLHttpRequestGet(url, callback) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText)
      } else if (this.readyState == 4 && this.status == 400) {
        callback(null)
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  function XMLHttpRequestPostForm(url, callback, form, params = {}) {
    var formData = new FormData(form);
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText, params)
      } else if (this.readyState == 4 && this.status == 400) {
        callback(null)
      }
    };

    xmlhttp.open("POST", url, true);
    //xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(formData);
  }

  Controller.prototype.handleResetRequest = function(transmittedData) {
    let url = "http://localhost:5000"
    views.handleResetRequest()
    if (transmittedData.pushState) {
      history.pushState(null, '', url);
    }
  }

  Controller.prototype.handleIndexRequest = function(transmittedData) {
    let url = "http://localhost:5000/entries/" + transmittedData.indexElement.id;
    XMLHttpRequestGet(url, views.handleIndexRequest)
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
    let url = "http://localhost:5000/entries/edit/" + oldSlug;
    XMLHttpRequestPostForm(url, views.handleEditFormSubmit, editEntryForm, [oldSlug])
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
    let url = "http://localhost:5000/entries";
    XMLHttpRequestPostForm(url, views.handleAddFormSubmit, addEntryForm)

  }

  Controller.prototype.handleAddFormChanged = function(e) {
    let formInput =
    {
      title: e.target.form["title"].value,
      description: e.target.form["description"].value,
      markdown: e.target.form["markdown"].value
    }
    sessionStorage.setItem('addFormData', JSON.stringify(formInput));
  }

  Controller.prototype.handleEditFormChanged = function(e) {
    let formInput =
      {
        title: e.target.form["title"].value,
        description: e.target.form["description"].value,
        markdown: e.target.form["markdown"].value
      }
    sessionStorage.setItem('editFormData', JSON.stringify(formInput));
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
      formDataAdd : JSON.parse(sessionStorage.getItem("addFormData")),
      formDataEdit : JSON.parse(sessionStorage.getItem("editFormData"))
    }
    let routes = [
      { path: "http://localhost:5000/" , handler: this.handleResetRequest},
      { path: "http://localhost:5000/getEntries" , handler: this.handleWelcomeButton},
      { path: "http://localhost:5000/entries/" + urlEnd , handler: this.handleIndexRequest},
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