import React from "react";

export default React.createClass({

  displayName: "Title Bar",

  propTypes: {
    title: React.PropTypes.string,
    description: React.PropTypes.string
  },

  render: function () {
    return (
      <header className="title-bar">
        {this.props.title ? <h1>{this.props.title}</h1> : null}
        {this.props.description ? <h2>{this.props.description}</h2> : null}
      </header>
    );
  }

});