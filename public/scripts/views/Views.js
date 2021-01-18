Views = function(controller, models) {
  this.controller = controller
  this.models = models
  this.canvasController = new CanvasController()
  this.dragDropController = new DragDropController()

  Views.prototype.handleIndexRequest = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    let entryJson = JSON.parse(entry)

    ContentBoxView.showIndex(entryJson)
    if (!this.controller.toggle) {
      this.controller.handleIndexButtonClick()
    }
    if (entryJson.isPublic) {
      this.controller.handleShowPublicButtonClick()
    } else {
      this.controller.handleShowPrivateButtonClick()
    }
    TitleBarView.showEditButton()
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
    this.controller.registerEventListenerById("deleteButton", "click", this.controller.handleDeleteButton)
  }.bind(this)

  Views.prototype.handleWelcomeButton = function(entries) {
    if (!entries) {
      alert("No data transmitted!")
      return
    }
    let entriesJson = JSON.parse(entries)
    if (entriesJson.length === 0) {
      alert("Unfortunately there exist no public entries at the moment!")
      return
    }
    ContentBoxView.showEntries(entriesJson)
    for(let i = 0; i < entriesJson.length; i++) {
      let indexElement = document.getElementById(entriesJson[i].slug)
      let parameter = {pushState: true, indexElement : indexElement}
      this.controller.registerEventListenerByIdWithParameter("read-button" + entriesJson[i].slug, "click", this.controller.handleIndexRequestPublic, parameter)
    }
  }.bind(this)

  Views.prototype.handleEditButton = function(formData) {
    models.sessionSaveData(models.sessionKeys.editFormData, formData)
    let useDefault = JSON.stringify(formData) === JSON.stringify(models.formDataDefault)
    ContentBoxView.showEditEntry(formData, useDefault)
    this.canvasController.loadCanvas()
    this.dragDropController.loadDragDrop()
    this.controller.registerEventListenerById("editEntryForm", "change", this.controller.handleEditFormChanged)
    this.controller.registerEventListenerById("nameListDelete", "click", this.controller.deleteImageFromEditUploadList)
    this.controller.registerEventListenerById("images", "change", this.controller.handleEditUploadListChanged)
  }

  Views.prototype.handleEditFormSubmit = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    let oldSlug = document.getElementById('editEntryForm').elements["editEntryFormSlug"].value;;
    indexListView.showEditedEntry(entryJson, oldSlug)
    ContentBoxView.showIndex(entryJson)
    let indexElement = document.getElementById(entryJson.slug)
    let parameter = {pushState: true, indexElement : indexElement}
    if (models.getCurrentEntryJson().isPublic) {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPublic, parameter)
      this.controller.handleShowPublicButtonClick()
    } else {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPrivate, parameter)
      this.controller.handleShowPrivateButtonClick()
    }
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    this.controller.registerEventListenerById("deleteButton", "click", this.controller.handleDeleteButton)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleAddFormSubmit = function(entry) {
    if (!entry) {
      alert("No data saved!")
      return
    }
    const entryJson = JSON.parse(entry)
    indexListView.showAddedEntry(entryJson)
    ContentBoxView.showIndex(entryJson)
    let indexElement = document.getElementById(entryJson.slug)
    let parameter = {pushState: true, indexElement : indexElement}
    if (entryJson.isPublic) {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPublic, parameter)
      // das war der privatepublic bug mit den buttons
      //this.controller.handleShowPublicButtonClick()
    } else {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPrivate, parameter)
      this.controller.handleShowPrivateButtonClick()
    }
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    this.controller.registerEventListenerById("deleteButton", "click", this.controller.handleDeleteButton)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
    models.resetFormData(models.sessionKeys.addFormData)
  }.bind(this)

  Views.prototype.handleAddButton = function(formData) {
    models.sessionSaveData(models.sessionKeys.addFormData, formData)
    let useDefault = JSON.stringify(formData) === JSON.stringify(models.formDataDefault)
    ContentBoxView.showAddEntry(formData, useDefault)
    this.canvasController.loadCanvas()
    this.dragDropController.loadDragDrop()
    this.controller.registerEventListenerById("images", "change", this.controller.handleUploadListChanged)
    this.controller.registerEventListenerById("addEntryForm", "submit", this.controller.handleAddFormSubmit)
    this.controller.registerEventListenerById("addEntryForm", "change", this.controller.handleAddFormChanged)
  }

  Views.prototype.handleDeleteButton = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    indexListView.deleteEntry(entryJson)
    this.handleResetRequest()
  }.bind(this)

  Views.prototype.handleResetRequest = function() {
    ContentBoxView.resetContentBox()
    this.controller.registerEventListenerById("welcomeButton", "click", this.controller.handleWelcomeButton)
  }
}
