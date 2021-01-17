WebSocketView = function() {

  const messages = document.querySelector('#chatMessages');
  const messageBox = document.querySelector('#messageBox');

  WebSocketView.prototype.showMessage = function(message, isOwnMessage) {
    let alignment = isOwnMessage? "row-reverse" : "row"
    let backgroundColor = isOwnMessage? "mediumturquoise" : "#80EBA4"
    let borderColor = isOwnMessage? "blue" : "#28A745"
    messages.innerHTML += `
    <div style="display: flex; flex-direction: ${alignment}; height: max-content; width: 80%;">
      <p style="
        word-wrap: break-word;
        max-width: 80%;
        padding: 5px;
        font-size: 11pt;
        color: orangered;
        background-color: ${backgroundColor};
        line-height: 13pt;
        border: ${borderColor} ridge 2px;
        margin-top: 4px;">${message}
      </p>
    </div>`

    messageBox.value = '';
  }
}