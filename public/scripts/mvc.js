document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {

  const controller = new Controller()
  const webSocketController = new WebSocketController()

  console.log(localStorage)
  loadPrivateEntries()
  registerEventListeners(controller)
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

  let indexButton = document.getElementById("index-button");
  indexButton.addEventListener('click', function (event){
    controller.handleIndexButtonClick()})

  indexButton.addEventListener('mouseover', function (event){
    controller.handleIndexButtonHover()})

  indexButton.addEventListener('mouseout', function (event){
    controller.handleIndexButtonUnhover()})

  let showPrivateButton = document.getElementById('show-private');
  showPrivateButton.addEventListener('click', function(event){
    controller.handleShowPrivateButtonClick()})

  showPrivateButton.addEventListener('mouseover', function(event){
    controller.handleShowPrivateButtonHover()})

  showPrivateButton.addEventListener('mouseout', function(event){
    controller.handleShowPrivateButtonUnhover()})

  let showPublicButton = document.getElementById('show-public');
  showPublicButton.addEventListener('click', function (event){
    controller.handleShowPublicButtonClick()})

  showPublicButton.addEventListener('mouseover', function(event){
    controller.handleShowPublicButtonHover()})

  showPublicButton.addEventListener('mouseout', function(event){
    controller.handleShowPublicButtonUnhover()})

  window.addEventListener('popstate', function(event){
    controller.handleUrlChange(event)
    console.log('location changed!');
  })
}
