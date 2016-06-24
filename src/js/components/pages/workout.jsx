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
import SFX from "../../audio";

export default withRouter(React.createClass({

  displayName: "Workout Page",
  mixins: [TopDownRenderingMixin],

  propTypes: {
    data: React.PropTypes.object
  },

  componentDidMount: function () {
    this.createInterval();
  },

  componentWillUnmount: function () {
    this.timer.clear();
  },

  createInterval: function () {
    this.timer = accurateInterval(this.tick, 1000);
  },

  restartInterval: function () {
    this.timer.clear();
    this.createInterval()
  },

  tick: function () {
    var current, goingDown;

    current = this.getLCDSeconds();
    goingDown = [WORKOUT_STATES.rest, WORKOUT_STATES.start]
        .indexOf(this.props.data.get("workoutState")) > -1;

    Actions.timer.update();

    SFX.beep.volume = goingDown && current <= 5 ? 1 : 0;
    SFX.beep.play();
    SFX.wooden.play();
  },

  getTitleDescription: function () {
    var desc;

    switch (this.props.data.get("workoutState")) {
      case WORKOUT_STATES.start:
        desc = "Get ready for your first set.";
        break;
      case WORKOUT_STATES.work:
        desc = "Tap on the timer if you are done.";
        break;
      case WORKOUT_STATES.paused:
        desc = "Hit continue when you are back.";
        break;
      case WORKOUT_STATES.rest:
        desc = "Tap on the timer to jump to the next set.";
        break;
    }

    return desc;
  },

  onPauseWorkout: function () {
    this.timer.clear();
    Actions.workout.pause();
  },

  onFinishWorkout: function () {
    this.timer.clear();
    Actions.workout.finish();
    this.props.router.replace("/stats");
  },

  onContinueWorkout: function () {
    this.createInterval();
    Actions.workout.continue();
  },

  onSetFinished: function () {
    var ws = this.props.data.get("workoutState");

    if (ws === WORKOUT_STATES.work) {
      this.restartInterval();
      Actions.workout.rest();
    } else if (ws === WORKOUT_STATES.rest) {
      this.restartInterval();
      Actions.workout.restEnd();
    }
  },

  getLCDSeconds: function () {
    var activeKey = this.props.data.get("activeKey");

    return this.props.data.get(activeKey);
  },

  render: function () {
    return (
      <section className="container">
        <TitleBar title={this.props.data.get("workoutState")}
                  description={this.getTitleDescription()} />
        <Hammer onTap={this.onSetFinished}>
          <div className="content">
            <LCD seconds={this.getLCDSeconds()}/>
          </div>
        </Hammer>
        <footer className="footer">
          {this.props.data.get("workoutState") === WORKOUT_STATES.paused ?
            <ActionButton type="continue" onTap={this.onContinueWorkout}/> :
            <ActionButton type="pause" onTap={this.onPauseWorkout}/>}
          <ActionButton type="stop" onTap={this.onFinishWorkout}/>
        </footer>
      </section>
    );
  }

}));