import React from "react";
import Hammer from "react-hammerjs";
import {withRouter} from "react-router";
import accurateInterval from "accurate-interval";

import {WORKOUT_STATES} from "../../stores/store";
import Actions from "../../actions";
import TopDownRenderingMixin from "../../mixins/top-down-rendering";
import TitleBar from "../ui/title";
import LCD from "../ui/lcd";
import {ActionButton} from "../ui/button";

export default withRouter(React.createClass({

  displayName: "Workout Page",
  mixins: [TopDownRenderingMixin],

  propTypes: {
    data: React.PropTypes.object
  },

  onRestartWorkout: function () {
    this.props.router.replace("/");
  },

  render: function () {
    return (
      <section className="container">
        <TitleBar title="Workout finished"
                  description="You can check out your total workout time above." />
        <div className="content">
          <LCD allowHours={true} seconds={this.props.data.get("totalWorkoutTime")}/>
        </div>
        <footer className="footer">
          <ActionButton type="restart" onTap={this.onRestartWorkout}/>
        </footer>
      </section>
    );
  }

}));