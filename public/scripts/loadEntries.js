function loadEntries() {
    let xmlhttp = new XMLHttpRequest();
    let url = "http://localhost:5000/entries/getEntries";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var entries = JSON.parse(this.responseText);
            showEntries(entries);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function showEntries(entries) {
    const contentBox = document.getElementById("contentBox");
        for (var i = 0; i < entries.length; i++) {
            if (i == 0){
                contentBox.innerHTML = ``
            }
            contentBox.innerHTML += `
        <div class="card mt-4">
            <div class="card-body">
            <h4 class="card-title">${entries[i].title}</h4>
        <div class="card-subtitle text-muted mb-2">
        ${(new Date(entries[i].createdAt).toLocaleDateString())}
        </div>
        <div>${entries[i].sanitizedHtml}</div>
        <a href="" class="btn btn-info">
            Edit
        </a>
        <form action="/entries/${entries[i]}?_method=DELETE" class="d-inline" method="POST">
            <button type="submit" class="btn btn-danger">Delete</button>
        </form>
        </div>
        </div>
        </div>
    `;
        }
}