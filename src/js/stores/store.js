import Reflux from "reflux";
import immstruct from "immstruct";
import Actions from "../actions";

export default Reflux.createStore({

  data: immstruct({
    restingTimeInSeconds: 975,
    workoutState: "Work"
  }),

  init: function () {
    /* Start listening to actions. */
  }

});