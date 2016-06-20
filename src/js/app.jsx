import React from "react";
import {Link} from "react-router";

import Store from "./stores/store";

export default React.createClass({

  displayName: "App",

  render: function () {
    return (
      <div className="app">
        <section className="page-content">
          {React.cloneElement(
            this.props.children,
            { data: Store.data.cursor() }
          )}
        </section>
      </div>
    );
  }

});