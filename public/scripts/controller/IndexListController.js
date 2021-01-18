IndexListController = function () {

  this.toggle = 0;

  IndexListController.prototype.handleIndexButtonClick = function() {

    if(this.toggle) {
      document.getElementById("indexListPublic").style.visibility = "hidden";
      document.getElementById("filter").style.visibility = "hidden";
      document.getElementById("indexListPrivate").style.visibility = "hidden"
      return this.toggle = 0;
    } else {
      document.getElementById("indexListPublic").style.visibility = "visible";
      document.getElementById("filter").style.visibility = "visible";
      return this.toggle = 1;
    }
  }

  IndexListController.prototype.handleIndexButtonHover = function () {
    document.getElementById("index-button").setAttribute("src",
      "http://localhost:5000/public/resources/INDEX-H.svg");
  }

  IndexListController.prototype.handleIndexButtonUnhover = function () {
    document.getElementById("index-button").setAttribute("src",
      "http://localhost:5000/public/resources/INDEX.svg");
  }

  IndexListController.prototype.handleShowPrivateButtonClick = function () {
    document.getElementById("indexListPublic").style.visibility = "hidden";
    document.getElementById("indexListPrivate").style.visibility = "visible";
  }

  IndexListController.prototype.handleShowPrivateButtonHover = function () {
    document.getElementById("show-private").style.height = "25px";
  }

  IndexListController.prototype.handleShowPrivateButtonUnhover = function () {
    document.getElementById("show-private").style.height = "20px";
  }

  IndexListController.prototype.handleShowPublicButtonClick = function () {
    document.getElementById("indexListPublic").style.visibility = "visible";
    document.getElementById("indexListPrivate").style.visibility = "hidden";
  }

  IndexListController.prototype.handleShowPublicButtonHover = function () {
    document.getElementById("show-public").style.height = "25px";
  }

  IndexListController.prototype.handleShowPublicButtonUnhover = function () {
    document.getElementById("show-public").style.height = "20px";
  }
}