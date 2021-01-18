document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {

  const indexListController = new IndexListController()
  const webSocketController = new WebSocketController()
  const controller = new Controller(indexListController)


  console.log(localStorage)
  loadPrivateEntries()
  registerEventListeners(controller)
  registerEventListenersIndexList(indexListController)
  webSocketController.createWebSocket()
  window.history.pushState(null, '', "http://localhost:5000/");
}

function loadPrivateEntries() {
  let privateEntries = localStorage.getItem("entries")
  let privateEntriesJson = JSON.parse(privateEntries)
  for(let entry in privateEntriesJson) {
    indexListView.showAddedEntry(privateEntriesJson[entry])
  }
}

function registerEventListeners(controller) {
  let indexListPublic = document.getElementById('indexListPublic');
  let indexListPublicChildren = [...indexListPublic.children];
  indexListPublicChildren.forEach(element => {
    element.addEventListener('click', function(){
      controller.handleIndexRequestPublic({indexElement: element, pushState: true})
    })
  })

  let indexListPrivate = document.getElementById('indexListPrivate');
  let indexListPrivateChildren = [...indexListPrivate.children];
  indexListPrivateChildren.forEach(element => {
    element.addEventListener('click', function(){
      controller.handleIndexRequestPrivate({indexElement: element, pushState: true})
    })
  })

  let welcomeButton = document.getElementById('welcomeButton');
  welcomeButton.addEventListener('click', function(){
    controller.handleWelcomeButton({pushState: true})
  })

  let editButton = document.getElementById('editButton');
  editButton.addEventListener('click', function(){
    let formData = JSON.parse(sessionStorage.getItem("currentEntry"))
    controller.handleEditButton({pushState: true, formDataEdit: formData})
  })

  let addButton = document.getElementById('addButton');
  addButton.addEventListener('click', function(event){
    event.preventDefault()
    let formData = JSON.parse(sessionStorage.getItem("addFormData"))
    controller.handleAddButton({pushState: true, formDataAdd: formData})
  })

  window.addEventListener('popstate', function(event){
    controller.handleUrlChange(event)
    console.log('location changed!');
  })
}

function registerEventListenersIndexList(indexListController) {

  let indexButton = document.getElementById("index-button");
  indexButton.addEventListener('click', function (event){
    indexListController.handleIndexButtonClick()})

  indexButton.addEventListener('mouseover', function (event){
    indexListController.handleIndexButtonHover()})

  indexButton.addEventListener('mouseout', function (event){
    indexListController.handleIndexButtonUnhover()})

  let showPrivateButton = document.getElementById('show-private');
  showPrivateButton.addEventListener('click', function(event){
    indexListController.handleShowPrivateButtonClick()})

  showPrivateButton.addEventListener('mouseover', function(event){
    indexListController.handleShowPrivateButtonHover()})

  showPrivateButton.addEventListener('mouseout', function(event){
    indexListController.handleShowPrivateButtonUnhover()})

  let showPublicButton = document.getElementById('show-public');
  showPublicButton.addEventListener('click', function (event){
    indexListController.handleShowPublicButtonClick()})

  showPublicButton.addEventListener('mouseover', function(event){
    indexListController.handleShowPublicButtonHover()})

  showPublicButton.addEventListener('mouseout', function(event){
    indexListController.handleShowPublicButtonUnhover()})

}