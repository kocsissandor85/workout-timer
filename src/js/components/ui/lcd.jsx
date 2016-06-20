import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({

  displayName: "LCD Display",

  propTypes: {
    seconds: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      height: 0
    };
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return (this.props.seconds !== nextProps.seconds) ||
           (this.state.height !== nextState.height);
  },

  componentDidMount: function () {
    this.componentDidUpdate();
  },

  componentDidUpdate: function () {
    var node, parent, height;

    node = ReactDOM.findDOMNode(this);
    parent = node.parentNode;
    height = parent.offsetHeight;

    this.setState({
      height: height
    });
  },

  getMinutes: function () {
    return Math.floor(this.props.seconds / 60);
  },

  getSeconds: function () {
    return this.props.seconds % 60;
  },

  render: function () {
    var style = {
      fontSize: this.state.height
    };

    return (
      <div style={style} className="lcd">
        <span>{this.getMinutes()}:{this.getSeconds()}</span>
        <span className="baseliner" style={this.state}></span>
      </div>
    );
  }

});