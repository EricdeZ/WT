WebSocketController = function () {
  this.websocketView = new WebSocketView()
  this.sendBtn = document.querySelector('#chatSendButton');
  this.confirmBtn = document.querySelector('#confirmUsernameButton');
  this.messages = document.querySelector('#chatMessages');
  this.messageBox = document.querySelector('#messageBox');
  this.usernameBox = document.querySelector('#usernameBox');

}

WebSocketController.prototype.createWebSocket = function () {

  let ws = new WebSocket('ws://localhost:5000');
  ws.onopen = () => {
    console.log('Connection opened!');
  }
  ws.onmessage = ({ data }) => this.websocketView.showMessage(data, false);
  ws.onclose = function() {
    ws = null;
  }

  this.sendBtn.addEventListener("click",function (e) {
    if (!ws) {
      this.websocketView.showMessage("No WebSocket connection :(");
      return ;
    }
    if (this.messageBox.value != "") {
      let chatMessage = this.usernameBox.value + ": <br>" + this.messageBox.value;
      ws.send(chatMessage);
      this.websocketView.showMessage(chatMessage, true);
    }
  }.bind(this))

  this.confirmBtn.addEventListener("click",function (e) {
    if(this.usernameBox.value != "") {
      this.usernameBox.style.display = "none";
      this.confirmBtn.style.display = "none";
      this.messageBox.style.display = "inline-flex";
      this.sendBtn.style.display = "inline-flex";
    }
  }.bind(this))

}