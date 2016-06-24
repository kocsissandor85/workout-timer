import Reflux from "reflux";
import _ from "lodash";
import immstruct from "immstruct";
import Actions from "../actions";

const DEFAULT_RESTING_TIME = 90;
const DEFAULT_REMAINING_TIME = 10;

export const WORKOUT_STATES = {
  start: "Let's start",
  work: "Work",
  rest: "Rest",
  paused: "Be right back"
};

const TIMER_KEYS = {
  remaining: "remainingTime",
  elapsed: "elapsedTime"
};

export default Reflux.createStore({

  data: immstruct({
    activeKey: TIMER_KEYS.remaining,
    elapsedTime: 0,
    increment: -1,
    remainingTime: DEFAULT_REMAINING_TIME,
    restingTime: DEFAULT_RESTING_TIME,
    totalWorkoutTime: 0,
    workoutState: WORKOUT_STATES.start
  }),

  stateBeforePaused: null,

  init: function () {
    this.listenTo(Actions.workout.start, this.handleAction.bind(this, "start"));
    this.listenTo(Actions.workout.rest, this.handleAction.bind(this, "rest"));
    this.listenTo(Actions.workout.restEnd, this.handleAction.bind(this, "restEnd"));
    this.listenTo(Actions.workout.pause, this.handleAction.bind(this, "pause"));
    this.listenTo(Actions.workout.continue, this.handleAction.bind(this, "continue"));
    this.listenTo(Actions.workout.finish, this.handleAction.bind(this, "finish"));

    this.listenTo(Actions.timer.adjust, this.adjustTimer);
    this.listenTo(Actions.timer.update, this.updateTimer);
  },

  handleAction: function (action) {
    var converted = this.data.cursor().deref().toJS();

    switch (action) {
      case "start":
        this.data.cursor().update(d => d.withMutations(d => {
          d.set("totalWorkoutTime", 0);
          d.set("workoutState", WORKOUT_STATES.start);
        }));

        break;
      case "rest":
        this.data.cursor().update(d => d.withMutations(d => {
          d.set("activeKey", TIMER_KEYS.remaining);
          d.set("increment", converted.increment * -1);
          d.set("workoutState", WORKOUT_STATES.rest);
        }));

        break;
      case "restEnd":
        this.data.cursor().update(d => d.withMutations(d => {
          d.set("activeKey", TIMER_KEYS.elapsed);
          d.set("elapsedTime", 0);
          d.set("increment", converted.increment * -1);
          d.set("remainingTime", converted.restingTime);
          d.set("workoutState", WORKOUT_STATES.work);
        }));

        break;
      case "pause":
        this.stateBeforePaused = this.data.cursor().get("workoutState");
        this.data.cursor().update(d => d.set("workoutState", WORKOUT_STATES.paused));

        break;
      case "continue":
        this.data.cursor().update(d => d.set("workoutState", this.stateBeforePaused));
        this.stateBeforePaused = null;

        break;
      case "finish":
        this.data.cursor().update(d => d.withMutations(d => {
          d.set("activeKey", TIMER_KEYS.remaining);
          d.set("elapsedTime", 0);
          d.set("increment", -1);
          d.set("remainingTime", DEFAULT_REMAINING_TIME);
          d.set("restingTime", DEFAULT_RESTING_TIME);
        }));

        break;
    }
  },

  adjustTimer: function (direction, step = 1) {
    var currentRestingTime, newRestingTime;

    currentRestingTime = this.data.cursor("restingTime");
    newRestingTime = Math.max(1, currentRestingTime + (direction * step));

    this.data.cursor().update(d => d.set("restingTime", newRestingTime));
  },

  updateTimer: function () {
    var converted = this.data.cursor().deref().toJS();

    this.data.cursor().update(d => d.withMutations(d => {
      let goingDown, current;

      goingDown = converted.activeKey === TIMER_KEYS.remaining;
      current = converted[converted.activeKey];

      // Is the time up?
      if (goingDown && current === 1) {
        d.set("activeKey", TIMER_KEYS.elapsed);
        d.set("elapsedTime", 0);
        d.set("increment", converted.increment * -1);
        d.set("remainingTime", converted.restingTime);
        d.set("workoutState", WORKOUT_STATES.work);
      } else {
        d.set(converted.activeKey, current + converted.increment);
      }

      d.set("totalWorkoutTime", converted.totalWorkoutTime + 1);
    }));
  }

});