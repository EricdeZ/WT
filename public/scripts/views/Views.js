Views = function(controller, indexListController, models) {
  const canvasController = new CanvasController()
  const dragDropController = new DragDropController()

  Views.prototype.handleIndexRequest = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    let entryJson = JSON.parse(entry)

    ContentBoxView.showIndex(entryJson)
    if (!indexListController.toggle) {
      indexListController.handleIndexButtonClick()
    }
    if (entryJson.isPublic) {
      indexListController.handleShowPublicButtonClick()
    } else {
      indexListController.handleShowPrivateButtonClick()
    }
    TitleBarView.showEditButton()
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    controller.registerEventListenerById("homePageButton", "click", controller.handleWelcomeButton)
    controller.registerEventListenerById("deleteButton", "click", controller.handleDeleteButton)
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
      controller.registerEventListenerByIdWithParameter("read-button" + entriesJson[i].slug, "click", controller.handleIndexRequestPublic, parameter)
    }
  }.bind(this)

  Views.prototype.handleEditButton = function(formData) {
    models.sessionSaveData(models.sessionKeys.editFormData, formData)
    let useDefault = JSON.stringify(formData) === JSON.stringify(models.formDataDefault)
    ContentBoxView.showEditEntry(formData, useDefault)
    canvasController.loadCanvas()
    dragDropController.loadDragDrop()
    controller.registerEventListenerById("editEntryForm", "change", controller.handleEditFormChanged)
    controller.registerEventListenerById("nameListDelete", "click", controller.deleteImageFromEditUploadList)
    controller.registerEventListenerById("images", "change", controller.handleEditUploadListChanged)
  }

  Views.prototype.handleEditFormSubmit = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    let oldSlug = document.getElementById('editEntryForm').elements["editEntryFormSlug"].value;
    indexListView.showEditedEntry(entryJson, oldSlug)
    ContentBoxView.showIndex(entryJson)
    let indexElement = document.getElementById(entryJson.slug)
    let parameter = {pushState: true, indexElement : indexElement}
    if (models.getCurrentEntryJson().isPublic) {
      controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", controller.handleIndexRequestPublic, parameter)
      indexListController.handleShowPublicButtonClick()
    } else {
      controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", controller.handleIndexRequestPrivate, parameter)
      indexListController.handleShowPrivateButtonClick()
    }
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    controller.registerEventListenerById("deleteButton", "click", controller.handleDeleteButton)
    controller.registerEventListenerById("homePageButton", "click", controller.handleWelcomeButton)
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
      controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", controller.handleIndexRequestPublic, parameter)
    } else {
      controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", controller.handleIndexRequestPrivate, parameter)
    }
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    controller.registerEventListenerById("deleteButton", "click", controller.handleDeleteButton)
    controller.registerEventListenerById("homePageButton", "click", controller.handleWelcomeButton)
    models.resetFormData(models.sessionKeys.addFormData)
  }.bind(this)

  Views.prototype.handleAddButton = function(formData) {
    models.sessionSaveData(models.sessionKeys.addFormData, formData)
    let useDefault = JSON.stringify(formData) === JSON.stringify(models.formDataDefault)
    ContentBoxView.showAddEntry(formData, useDefault)
    canvasController.loadCanvas()
    dragDropController.loadDragDrop()
    controller.registerEventListenerById("images", "change", controller.handleUploadListChanged)
    controller.registerEventListenerById("addEntryForm", "submit", controller.handleAddFormSubmit)
    controller.registerEventListenerById("addEntryForm", "change", controller.handleAddFormChanged)
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
    controller.registerEventListenerById("welcomeButton", "click", controller.handleWelcomeButton)
  }
}
