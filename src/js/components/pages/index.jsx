import React from "react";
import Hammer from "react-hammerjs";
import _ from "lodash";

import Actions from "../../actions";
import TopDownRenderingMixin from "../../mixins/top-down-rendering";
import TitleBar from "../ui/title";
import LCD from "../ui/lcd";
import {ActionButton} from "../ui/button";

export default React.createClass({

  displayName: "Index Page",
  mixins: [TopDownRenderingMixin],

  panAdjustmentBuffer: 0,

  propTypes: {
    data: React.PropTypes.object
  },

  adjustRestingTime: function (evt) {
    var leftRight, threshold;

    if ([2, 4].indexOf(evt.direction) > -1) {
      leftRight = evt.direction - 3;
      threshold = 500;

      this.panAdjustmentBuffer += Math.round(Math.abs(evt.distance * evt.velocityX));

      if (this.panAdjustmentBuffer > threshold) {
        Actions.timer.adjust(leftRight, 1);
        this.panAdjustmentBuffer = 0;
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

  render: function () {
    return (
      <section className="container">
        <TitleBar description="Set your resting time. Swipe left or right to adjust it." />
        <Hammer options={this.getHammerOptions()} onPan={this.adjustRestingTime}>
          <div className="content">
            <LCD seconds={this.props.data.get("restingTimeInSeconds")}/>
          </div>
        </Hammer>
        <footer className="footer">
          <ActionButton type="play" onTap={Actions.workout.start}/>
        </footer>
      </section>
    );
  }

});