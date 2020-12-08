function postNewEntry() {
  const form = document.getElementById("addEntryForm");
  var formData = new FormData(form);
  let xmlhttp = new XMLHttpRequest();
  let url = "http://localhost:5000/entries";
  //location.replace("http://localhost:5000");

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const entry = JSON.parse(this.responseText);
      showAddedEntry(entry);
    } else if (this.readyState == 4 && this.status == 400) {
      alert("Error occured while saving Entry!");
    }
  };

  xmlhttp.open("POST", url, true);
  //xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(formData);
}

function showAddedEntry(entry) {
  const indexList = document.getElementById("indexList");
  const newIndexEntry = document.createElement("li");
  newIndexEntry.setAttribute("class", "list-group-item-action index");
  newIndexEntry.setAttribute("id", entry.slug);
  newIndexEntry.setAttribute("onclick", "loadIndex(this)");
  newIndexEntry.innerHTML = `${entry.title}`;
  if (indexList.children.length > 0) {
    indexList.insertBefore(newIndexEntry, indexList.children[0]);
  } else {
    indexList.appendChild(newIndexEntry);
  }
  showIndex(entry)
}