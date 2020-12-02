function editEntry(listItem) {
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