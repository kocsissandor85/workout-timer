import Reflux from "reflux";
import immstruct from "immstruct";
import Actions from "../actions";

export default Reflux.createStore({

  data: immstruct({
    restingTimeInSeconds: 90,
    workoutState: "Work"
  }),

  init: function () {
    this.listenTo(Actions.workout.start, this.handleAction.bind(this, "start"));
    this.listenTo(Actions.workout.pause, this.handleAction.bind(this, "pause"));
    this.listenTo(Actions.workout.continue, this.handleAction.bind(this, "continue"));
    this.listenTo(Actions.workout.finish, this.handleAction.bind(this, "finish"));

    this.listenTo(Actions.timer.adjust, this.handleTimerAdjust);
  },

  handleAction: function (action) {
    alert(1);
  },

  handleTimerAdjust: function (direction, step) {
    var currentRestingTime, newRestingTime;

    currentRestingTime = this.data.cursor("restingTimeInSeconds");
    newRestingTime = Math.max(5, currentRestingTime + (direction * step));

    this.data.cursor().update(d => d.set("restingTimeInSeconds", newRestingTime));
  }

});