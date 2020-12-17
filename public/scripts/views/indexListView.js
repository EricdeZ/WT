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
}

function showEditedEntry(entry, oldSlug) {
  let indexList = document.getElementById("indexList");
  indexList.removeChild(indexList.children[oldSlug]);
  let newIndexEntry = document.createElement("li");
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