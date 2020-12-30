Models = function(controller) {
  this.controller = controller
  this.sessionKeys = {
    currentEntry : "currentEntry", // The entry data loaded on IndexRequest
    addFormData : "addFormData",   // The data how it was before the new entry was saved
    editFormData : "editFormData"  // The data how it was before the edited entry was saved
  }
  this.localKeys = {
    entries : "entries"            // All private entries which are saved in users browser
  }

  //-----------------------------------SESSIONSTORAGE-------------------------

  Models.prototype.setSessionStorageDefault = function() {
    this.resetFormData(this.sessionKeys.addFormData)
  }

  Models.prototype.resetFormData = function (key) {
    let formInput =
        {
          title: "Title",
          description: "Description",
          markdown: "MarkDown",
          isPublic: false
        }
    sessionStorage.setItem(key, JSON.stringify(formInput));
  }

  Models.prototype.getCurrentEntryJson = function () {
    return JSON.parse(sessionStorage.getItem("currentEntry"))
  }

  Models.prototype.getCurrentEntryString = function () {
    return sessionStorage.getItem("currentEntry")
  }

  Models.prototype.sessionSaveData = function (key, input) {
    sessionStorage.setItem(key, JSON.stringify(input));
  }

  Models.prototype.getSessionDataByKeyJson = function (key) {
    return JSON.parse(sessionStorage.getItem(key))
  }

  Models.prototype.getSessionDataByKeyString = function (key) {
    return sessionStorage.getItem(key)
  }

  //-----------------------------------LOCALSTORAGE-------------------------

  Models.prototype.savePrivateEntry = function(EntryForm) {
    let formInput =
      {
        title: EntryForm.title.value,
        description: EntryForm.description.value,
        markdown: EntryForm.markdown.value,
        createdAt: Date.now(),
        slug: Utils.convertToSlug(EntryForm.title.value),
        sanitizedHtml: EntryForm.markdown.value,
        isPublic: false
      }
    let entries = localStorage.getItem("entries")
    if (entries) {
      entries = JSON.parse(entries)
    } else {
      entries = {}
    }
    entries[formInput.slug] = formInput
    localStorage.setItem("entries", JSON.stringify(entries))
  }

  Models.prototype.getEntryJson = function (key) {
    return JSON.parse(localStorage.getItem("entries"))[key]
  }

  Models.prototype.getEntryString = function (key) {
    return JSON.stringify(JSON.parse(localStorage.getItem("entries"))[key])
  }

  Models.prototype.deleteEntry = function (key) {
    let entries = localStorage.getItem("entries")
    if (entries) {
      entries = JSON.parse(entries)
      if (entries[key] !== null)
      delete entries[key]
      localStorage.setItem("entries", JSON.stringify(entries))
    }
  }
}
