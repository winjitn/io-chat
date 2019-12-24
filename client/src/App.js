import React from "react";

import Welcome from "./Welcome";
import Chat from "./Chat";

class App extends React.Component {
  state = { welcome: true, room: "" };

  room = r => {
    this.setState({ welcome: false, room: r });
  };

  render() {
    return (
      <div className="ctn">
        {this.state.welcome === true ? (
          <Welcome join={this.room} />
        ) : (
          <Chat room={this.state.room} />
        )}
      </div>
    );
  }
}

export default App;
