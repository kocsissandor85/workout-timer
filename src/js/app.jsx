import React from "react";
import Hammer from "react-hammerjs";

import Store from "./stores/store";

export default React.createClass({

  displayName: "App",

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