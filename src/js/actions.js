import Reflux from "reflux";

var syncAction, asyncAction;

syncAction = {};
asyncAction = { asyncResult: true };

export default {
  workout: Reflux.createActions({
    start: syncAction,
    pause: syncAction,
    finish: syncAction
  })
};