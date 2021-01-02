indexListView = function () {}

indexListView.showAddedEntry = function (entry) {
  let indexList

  //TODO if is public and toggle is on .... show/ hide
  if (entry.isPublic) {
    indexList = document.getElementById("indexListPublic");
  } else {
    indexList = document.getElementById("indexListPublic");
  }
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
}

indexListView.showEditedEntry = function(entry, oldSlug) {
  let indexList
  if (entry.isPublic) {
    indexList = document.getElementById("indexListPublic");
  } else {
    indexList = document.getElementById("indexListPrivate");
  }
  indexList.removeChild(indexList.children[oldSlug]);
  const newIndexEntry = document.createElement("li");
  newIndexEntry.setAttribute("class", "list-group-item-action index");
  newIndexEntry.setAttribute("id", entry.slug);
  newIndexEntry.innerHTML = `${entry.title}`;
  if (indexList.children.length > 0) {
    indexList.insertBefore(newIndexEntry, indexList.children[0]);
  } else {
    indexList.appendChild(newIndexEntry);
  }
}