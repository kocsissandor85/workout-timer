import React from "react";

import Actions from "../../actions";
import TopDownRenderingMixin from "../../mixins/top-down-rendering";
import TitleBar from "../ui/title";
import LCD from "../ui/lcd";
import Button from "../ui/button";

export default React.createClass({

  displayName: "Index Page",
  mixins: [TopDownRenderingMixin],

  propTypes: {
    data: React.PropTypes.object
  },

  render: function () {
    return (
      <section className="container">
        <TitleBar description="Set your resting time. Swipe left or right to adjust it." />
        <div className="content">
          <LCD seconds={this.props.data.get("restingTimeInSeconds")}/>
        </div>
        <footer className="footer">
          <Button color="green" onClick={Actions.workout.start}>Start workout</Button>
        </footer>
      </section>
    );
  }

});