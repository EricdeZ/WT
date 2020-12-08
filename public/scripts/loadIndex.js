function loadIndex(listItem) {
    let xmlhttp = new XMLHttpRequest();
    let url = "http://localhost:5000/entries/" + listItem.id;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const entry = JSON.parse(this.responseText);
            showIndex(entry);
            showEditButton(entry);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function showIndex(entry) {
    const contentBox = document.getElementById("contentBox");
    $('#contentBox').data('entryData', entry);
    //$("#contentBox").load("../../public/views/_form_fields.html");
    contentBox.innerHTML = `
    <h1 class="mb-4">${entry.title}</h1>
      <div class="text-muted mb-2">
        ${(new Date(entry.createdAt).toLocaleDateString())}
      </div>
      <button onclick="loadEntries()" class="btn btn-secondary">HomePage</button>
      <div>${entry.sanitizedHtml}</div>
  `;
}

function showEditButton(entry) {
    const button = document.getElementById("editButton");
    button.style.visibility = "visible";
}