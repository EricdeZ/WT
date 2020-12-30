Views = function(controller, models) {
  this.controller = controller
  this.models = models

  Views.prototype.handleIndexRequest = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    let entryJson = JSON.parse(entry)

    ContentBoxView.showIndex(entryJson)
    TitleBarView.showEditButton()
    models.sessionSaveData(models.sessionKeys.currentEntry, entryJson)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleWelcomeButton = function(entries) {
    if (!entries) {
      alert("No data transmitted!")
      return
    }
    let entriesJson = JSON.parse(entries)
    ContentBoxView.showEntries(entriesJson)
  }

  Views.prototype.handleEditButton = function(formData) {
    ContentBoxView.showEditEntry(formData)
    this.controller.registerEventListenerById("editEntryForm", "change", this.controller.handleEditFormChanged)
  }

  Views.prototype.handleEditFormSubmit = function(entry, params) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    let oldSlug = params[0]
    indexListView.showEditedEntry(entryJson, oldSlug)
    ContentBoxView.showIndex(entryJson)
    let indexElement = document.getElementById(entryJson.slug)
    let parameter = {pushState: true, indexElement : indexElement}
    if (models.getCurrentEntryJson().isPublic) {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPublic, parameter)
    } else {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPrivate, parameter)
    }
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
    } else {
      this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequestPrivate, parameter)
    }
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
    models.resetFormData(models.sessionKeys.addFormData)
  }.bind(this)

  Views.prototype.handleAddButton = function(formData) {
    models.sessionSaveData(models.sessionKeys.addFormData, formData)
    ContentBoxView.showAddEntry(formData)
    this.controller.registerEventListenerById("addEntryForm", "submit", this.controller.handleAddFormSubmit)
    this.controller.registerEventListenerById("addEntryForm", "change", this.controller.handleAddFormChanged)
  }

  Views.prototype.handleResetRequest = function() {
    ContentBoxView.resetContentBox()
    this.controller.registerEventListenerById("welcomeButton", "click", this.controller.handleWelcomeButton)
  }
}