function loadIndex(listItem) {
  let xmlhttp = new XMLHttpRequest();
  let url = "http://localhost:5000/entries/" + listItem.id;

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var entry = JSON.parse(this.responseText);
      showIndex(entry);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function showIndex(entry) {
  const contentBox = document.getElementById("contentBox");
  //$("#contentBox").load("../../public/views/_form_fields.html");
  contentBox.innerHTML = `
    <h1 class="mb-4">${entry.title}</h1>
      <div class="text-muted mb-2">
        ${(new Date(entry.createdAt).toLocaleDateString())}
      </div>
      <a href="/" class="btn btn-secondary">HomePage</a>
      <a href="/articles/edit/${entry.id}" class="btn btn-info">Edit</a>
      <div>${entry.sanitizedHtml}></div>
  `;
}