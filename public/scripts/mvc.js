document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {

  const controller = new Controller()

  console.log(localStorage)
  loadPrivateEntries()
  registerEventListeners(controller)
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

  //todo implement these:
  let indexButton = document.getElementById("index-button");
  indexButton.addEventListener('click', function (event){
    controller.handleindexButton({pushState: true})})
  indexButton.addEventListener('mouseover', function (event){
    controller.handleindexHover()
  })
  indexButton.addEventListener('mouseout', function (event){
    controller.handleindexUnhover()
  })
  //todo---------------------------

  window.addEventListener('popstate', function(event){
    controller.handleUrlChange(event)
    console.log('location changed!');
  })
}

function setSessionStorageDefault() {

  let formInput =
  {
    title: "Title",
    description: "Description",
    markdown: "MarkDown"
  }
  sessionStorage.setItem('addFormData', JSON.stringify(formInput));
}

let toggle;
function openIndex()
{
  if(toggle)
  {
    document.getElementById("indexListPublic").style.visibility = "hidden";
    document.getElementById("filter").style.visibility = "hidden";
    document.getElementById("indexListPrivate").style.visibility = "hidden"
    return toggle=0;
  }
  else{
    document.getElementById("indexListPublic").style.visibility = "visible";
    document.getElementById("filter").style.visibility = "visible";
    return toggle=1;}
}

function hover(element)
{
  element.setAttribute("src", "public/resources/INDEX-H.svg")
}

function unhover(element)
{
  element.setAttribute("src", "public/resources/INDEX.svg")
}

function showPrivate()
{
  document.getElementById("indexListPublic").style.visibility = "hidden";
  document.getElementById("indexListPrivate").style.visibility = "visible";
}

function showPublic()
{
  document.getElementById("indexListPublic").style.visibility = "visible";
  document.getElementById("indexListPrivate").style.visibility = "hidden";
}

/* sessionStorageList:
*  currentEntry - The entry data loaded on IndexRequest
*  addFormData - The data how it was before the new entry was saved
*  editFormData - The data how it was before the edited entry was saved*/