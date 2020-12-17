document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {

  const controller = new Controller()

  registerEventListeners(controller)
  setSessionStorageDefault()
  window.history.pushState({hello: "no"}, '', "http://localhost:5000/");
}

function registerEventListeners(controller) {
  let indexList = document.getElementById('indexList');
  let indexListChildren = [...indexList.children];
  indexListChildren.forEach(element => {
    element.addEventListener('click', function(){
      controller.handleIndexRequest({indexElement: element, pushState: true})
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

function setSessionStorageDefault() {

  let formInput =
  {
    title: "Title",
    description: "Description",
    markdown: "MarkDown"
  }
  sessionStorage.setItem('addFormData', JSON.stringify(formInput));
}

/* sessionStorageList:
*  currentEntry - The entry data loaded on IndexRequest
*  addFormData - The data how it was before the new entry was saved
*  editFormData - The data how it was before the edited entry was saved*/