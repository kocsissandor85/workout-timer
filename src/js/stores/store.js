import Reflux from "reflux";
import immstruct from "immstruct";
import Actions from "../actions";

export const WORKOUT_STATES = {
  start: "Let's start",
  work: "Work",
  rest: "Rest",
  paused: "Be right back"
};

const DEFAULT_RESTING_TIME = 90;
const DEFAULT_REMAINING_TIME = 10;

const KEYS = {
  remaining: "remainingTime",
  elapsed: "elapsedTime"
};

const wooden = new Audio("../sfx/wooden.wav");
const double = new Audio("../sfx/double.wav");
const beep = new Audio("../sfx/beep.wav");

export default Reflux.createStore({

  data: immstruct({
    restingTime: DEFAULT_RESTING_TIME,
    workoutState: WORKOUT_STATES.start,

    elapsedTime: 0,
    remainingTime: DEFAULT_REMAINING_TIME,
    activeKey: KEYS.remaining,
    increment: -1,

    totalWorkoutTime: 0
  }),

  stateBeforePaused: null,

  init: function () {
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
      case "rest":
        this.data.cursor().update(d => d.withMutations(d => {
          d.set("activeKey", KEYS.remaining);
          d.set("workoutState", WORKOUT_STATES.rest);
          d.set("increment", converted.increment * -1);
        }));

        break;
      case "restEnd":
        this.data.cursor().update(d => d.withMutations(d => {
          d.set("activeKey", KEYS.elapsed);
          d.set("workoutState", WORKOUT_STATES.work);
          d.set("increment", converted.increment * -1);
          d.set("remainingTime", converted.restingTime);
          d.set("elapsedTime", 0);
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
        break;
    }
  },

  adjustTimer: function (direction, step) {
    var currentRestingTime, newRestingTime;

    currentRestingTime = this.data.cursor("restingTime");
    newRestingTime = Math.max(1, currentRestingTime + (direction * step));

    this.data.cursor().update(d => d.set("restingTime", newRestingTime));
  },

  updateTimer: function () {
    var converted = this.data.cursor().deref().toJS();

    this.data.cursor().update(d => d.withMutations(d => {
      let goingDown, current;

      goingDown = converted.activeKey === KEYS.remaining;
      current = converted[converted.activeKey];

      // Is the time up?
      if (goingDown && current <= 5) {
        beep.play();
      }

      if (goingDown && current === 1) {
        d.set("activeKey", KEYS.elapsed);
        d.set("workoutState", WORKOUT_STATES.work);
        d.set("increment", converted.increment * -1);
        d.set("remainingTime", converted.restingTime);
        d.set("elapsedTime", 0);
      } else {
        d.set(converted.activeKey, current + converted.increment);
      }

      wooden.play();
      d.set("totalWorkoutTime", converted.totalWorkoutTime + 1);
    }));
  }

});