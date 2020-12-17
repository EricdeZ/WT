document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() {

  const views = new Views()
  const models = new Models()
  const controller = new Controller(views, models)

  registerEventListeners(controller)
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
    controller.handleEditButton({pushState: true})
  })

  let addButton = document.getElementById('addButton');
  addButton.addEventListener('click', function(event){
    event.preventDefault()
    controller.handleAddButton({pushState: true, formData: null})
  })

  window.addEventListener('popstate', function(event){
    controller.handleUrlChange(event)
    console.log('location changed!');
  })
}