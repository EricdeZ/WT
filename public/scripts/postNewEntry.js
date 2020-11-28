function postNewEntry() {
  const form = document.getElementById("addEntryForm");
  var formData = new FormData(form);
  let xmlhttp = new XMLHttpRequest();
  let url = "http://localhost:5000/entries";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      i = 0;
      //Todo:
      //var entry = JSON.parse(this.responseText);
      //showIndex(entry);
    }
  };

  xmlhttp.open("POST", url, true);
  //xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(formData);
}