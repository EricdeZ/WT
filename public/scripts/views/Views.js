Views = function(controller) {
  this.controller = controller

  Views.prototype.handleIndexRequest = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    let entryJson = JSON.parse(entry)

    ContentBoxView.showIndex(entryJson)
    TitleBarView.showEditButton()
    sessionStorage.setItem('currentEntry', JSON.stringify(entryJson));
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
    IndexListView.showEditedEntry(entryJson, oldSlug)
    ContentBoxView.showIndex(entryJson)
    let indexElement = document.getElementById(entryJson.slug)
    let parameter = {pushState: true, indexElement : indexElement}
    this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequest, parameter)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleAddFormSubmit = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    IndexListView.showAddedEntry(entryJson)
    ContentBoxView.showIndex(entryJson)
    let indexElement = document.getElementById(entryJson.slug)
    let parameter = {pushState: true, indexElement : indexElement}
    this.controller.registerEventListenerByIdWithParameter(entryJson.slug, "click", this.controller.handleIndexRequest, parameter)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleAddButton = function(formData) {
    ContentBoxView.showAddEntry(formData)
    this.controller.registerEventListenerById("addEntryForm", "submit", this.controller.handleAddFormSubmit)
    this.controller.registerEventListenerById("addEntryForm", "change", this.controller.handleAddFormChanged)
  }

  Views.prototype.handleResetRequest = function() {
    ContentBoxView.resetContentBox()
    this.controller.registerEventListenerById("welcomeButton", "click", this.controller.handleWelcomeButton)
  }
}
