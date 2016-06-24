import React from "react";
import {withRouter} from "react-router";
import Hammer from "react-hammerjs";
import _ from "lodash";

import Actions from "../../actions";
import TopDownRenderingMixin from "../../mixins/top-down-rendering";
import TitleBar from "../ui/title";
import LCD from "../ui/lcd";
import {ActionButton} from "../ui/button";

const ADJUSTMENT_THRESHOLD = 200;
const ALLOWED_DIRECTIONS = [2, 4];

export default withRouter(React.createClass({

  displayName: "Index Page",
  mixins: [TopDownRenderingMixin],

  adjustmentLoadState: 0,

  propTypes: {
    data: React.PropTypes.object
  },

  adjustRestingTime: function (evt) {
    var direction, distanceByVelocity;

    if (ALLOWED_DIRECTIONS.indexOf(evt.direction) > -1) {
      distanceByVelocity = Math.round(Math.abs(evt.distance * evt.velocityX));
      this.adjustmentLoadState += distanceByVelocity;

      if (this.adjustmentLoadState > ADJUSTMENT_THRESHOLD) {
        // Directions 2 and 4 allowed. Extracting 3 gives us a direction, yay!
        direction = evt.direction - 3;

        Actions.timer.adjust(direction);
        this.adjustmentLoadState = 0;
      }
    }
  },

  getHammerOptions: function () {
    return {
      touchAction: "pan-y",
      recognizers: {
        pan: {
          threshold: 10
        }
      }
    };
  },

  onStartWorkout: function () {
    Actions.workout.start();
    this.props.router.replace("/workout");
  },

  render: function () {
    return (
      <section className="container">
        <TitleBar title="Set your resting time" description="Swipe left or right to adjust it." />
        <Hammer options={this.getHammerOptions()} onPan={this.adjustRestingTime}>
          <div className="content">
            <LCD seconds={this.props.data.get("restingTime")}/>
          </div>
        </Hammer>
        <footer className="footer">
          <ActionButton type="play" onTap={this.onStartWorkout}/>
        </footer>
      </section>
    );
  }

}));