import React from "react";
import io from "socket.io-client";

import "./Chat.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(process.env.PORT || "http://localhost:5000");
    this.messages = React.createRef();
    this.value = React.createRef();
    this.room = this.props.room;
  }

  componentDidMount() {
    var obj = this;
    this.socket.emit("chat", this.room);

    this.socket.on("chat", function(msg) {
      if (msg === "connected") {
        var status = document.querySelector("#status");
        status.classList.add("green", "remove");
        status.innerHTML = "Connected";
      }
    });

    this.socket.on(this.room, function(msg) {
      var node = document.createElement("li");
      var text = document.createTextNode(msg);
      node.appendChild(text);
      obj.messages.current.appendChild(node);
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.socket.emit(this.room, this.value.current.value);
    this.value.current.value = "";
    return;
  }

  render() {
    return (
      <div className="App">
        <button className="ui blue button" id="status">
          Please wait...
        </button>
        <ul id="messages" ref={this.messages}></ul>
        <form action="" id="form" onSubmit={e => this.onSubmit(e)}>
          <div className="ui fluid action input">
            <input
              id="m"
              autoComplete="off"
              ref={this.value}
              type="text"
              placeHolder="      Message..."
            />
            <button class="ui teal right labeled icon button">
              <i class="paper plane icon"></i>
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Chat;
