import React from "react";
import Hammer from "react-hammerjs";

import Store from "./stores/store";

export default React.createClass({

  displayName: "App",

  onDoubleTap: function (evt) {
    this.requestFullscreen(evt.currentTarget);
  },

  requestFullscreen: function (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  },

  render: function () {
    return (
      <Hammer onDoubleTap={this.onDoubleTap}>
        <div className="app">
          <section className="page-content">
            {React.cloneElement(
              this.props.children,
              { data: Store.data.cursor() }
            )}
          </section>
        </div>
      </Hammer>
    );
  }

});