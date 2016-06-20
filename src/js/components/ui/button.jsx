import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({

  displayName: "Button",

  propTypes: {
    color: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      color: "",
      onClick: function () {}
    };
  },

  getClassName: function () {
    return `button ${this.props.color}`;
  },

  render: function () {
    return (
      <a href="javascript:;"
         className={this.getClassName()}
         onClick={this.props.onClick}>
        <span>{this.props.children}</span>
      </a>
    );
  }

});