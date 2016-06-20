import React from "react";

import TopDownRenderingMixin from "../../mixins/top-down-rendering";
import TitleBar from "../ui/title";
import LCD from "../ui/lcd";

export default React.createClass({

  displayName: "Workout Page",
  mixins: [TopDownRenderingMixin],

  propTypes: {
    data: React.PropTypes.object
  },

  getTitleDescription: function () {
    return "Lorem ipsum dolor";
  },

  getTime: function () {
    return 10;
  },

  render: function () {
    return (
      <section className="container">
        <TitleBar title={this.props.data.get("workoutState")}
                  description={this.getTitleDescription()} />
        <div className="content">
          <LCD seconds={this.getTime()}/>
        </div>
        <footer className="footer">
          <p>Buttons come here.</p>
        </footer>
      </section>
    );
  }

});