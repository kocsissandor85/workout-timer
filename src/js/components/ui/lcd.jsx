import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

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
    window.addEventListener('resize', this.getThrottledHandleResize());
    this.handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.getThrottledHandleResize());
  },

  handleResize: function () {
    var node, parent, height;

    node = ReactDOM.findDOMNode(this);
    parent = node.parentNode;
    height = this.getMaximalFontSize(node, parent);

    this.setState({
      height: height
    });
  },

  getThrottledHandleResize: function () {
    if (!this.throttledHandleResize) {
      this.throttledHandleResize = _.throttle(this.handleResize, 200);
    }

    return this.throttledHandleResize;
  },

  getMaximalFontSize: function (node, parentNode) {
    var fs, parentHeight, parentWidth, result;

    parentHeight = Math.floor(parentNode.offsetHeight);
    result = parentHeight;

    fs = node.style.fontsize;
    node.style.visibility = "hidden";

    /* Set to max height. Fine in landscape mode. */
    node.style.fontSize = `${result}px`;

    /* Get width of parent node. */
    parentWidth = Math.floor(parentNode.offsetWidth);

    while (result && node.offsetWidth > parentWidth) {
      result = Math.max(0, result - 10);
      node.style.fontSize = `${result}px`;
    }

    /* Reset. */
    node.style.fontSize = `${fs}px`;
    node.style.visibility = "visible";

    return result;
  },

  getMinutes: function () {
    var m = Math.floor(this.props.seconds / 60);

    return m < 10 ? `0${m}` : m;
  },

  getSeconds: function () {
    var s = this.props.seconds % 60;

    return s < 10 ? `0${s}` : s;
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