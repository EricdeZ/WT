function Views() {
  Views.prototype.controller = null

  Views.prototype.handleIndexRequest = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    let entryJson = JSON.parse(entry)
    showIndex(entryJson)
    showEditButton()
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleWelcomeButton = function(entries) {
    if (!entries) {
      alert("No data transmitted!")
      return
    }
    let entriesJson = JSON.parse(entries)
    showEntries(entriesJson)
  }

  Views.prototype.handleEditButton = function() {
    showEditEntry()
  }

  Views.prototype.handleEditFormSubmit = function(entry, params) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    let oldSlug = params[0]
    showEditedEntry(entryJson, oldSlug)
    showIndex(entryJson)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleAddFormSubmit = function(entry) {
    if (!entry) {
      alert("No data transmitted!")
      return
    }
    const entryJson = JSON.parse(entry)
    showAddedEntry(entryJson)
    showIndex(entryJson)
    this.controller.registerEventListenerById("homePageButton", "click", this.controller.handleWelcomeButton)
  }.bind(this)

  Views.prototype.handleAddButton = function(formData) {
    showAddEntry(formData)
    this.controller.registerEventListenerById("addEntryForm", "change", this.controller.handleAddFormChanged)
  }

  Views.prototype.handleResetRequest = function() {
    resetContentBox()
    this.controller.registerEventListenerById("welcomeButton", "click", this.controller.handleWelcomeButton)
  }
}
