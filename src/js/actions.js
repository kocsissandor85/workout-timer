import Reflux from "reflux";

var syncAction, asyncAction;

syncAction = {};
asyncAction = { asyncResult: true };

export default {
  workout: Reflux.createActions({
    rest: syncAction,
    restEnd: syncAction,
    pause: syncAction,
    continue: syncAction,
    finish: syncAction
  }),

  timer: Reflux.createActions({
    adjust: syncAction,
    update: syncAction
  })
};