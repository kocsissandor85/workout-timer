import React from "react";
import ReactDOM from "react-dom";
import Hammer from "react-hammerjs";

var Button = React.createClass({

  displayName: "Button",

  propTypes: {
    type: React.PropTypes.string.isRequired,
    onTap: React.PropTypes.func.isRequired
  },

  getClassName: function () {
    return `button ${this.props.type}`;
  },

  render: function () {
    return (
      <Hammer onTap={this.props.onTap}>
        <span className={this.getClassName()}
              onTap={this.props.onTap}>
          {this.props.children}
        </span>
      </Hammer>
    );
  }

});

export default Button;

export var ActionButton = React.createClass({

  displayName: "Play Button",

  propTypes: {
    onTap: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(["play", "pause", "continue", "stop"]).isRequired
  },

  getHumanReadable: function () {
    var map = {
      play: "Start workout",
      continue: "Continue",
      pause: "Pause workout",
      stop: "Finish workout"
    };

    return map[this.props.type];
  },

  render: function () {
    return (
      <Button type={this.props.type} onTap={this.props.onTap}>
        <span className={`ti-control-${this.props.type}`}></span>
        <span>{this.getHumanReadable()}</span>
      </Button>
    );
  }
});