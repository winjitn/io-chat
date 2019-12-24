import React from "react";

import "./Welcome.css";

class Welcome extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    this.props.join(e.target.firstChild.firstChild.value);
  }
  render() {
    return (
      <>
        <div id="title">Socket.io Custom {"<Room />"}</div>
        <div className="join">
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="ui action large input">
              <input
                type="text"
                autoComplete="off"
                autoFocus="true"
                placeHolder="Enter room code"
              />
              <button className="ui inverted olive button">Join</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Welcome;
