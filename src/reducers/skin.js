import { SET_SKIN } from '../actions/skins';

const actionsMap = {
  [SET_SKIN]: (state, action) => {
    return action.payload
  }
};

export default function app(state = {}, action = {}) {
  const fn = actionsMap[action.type];

  return fn ? fn(state, action) : state;
}
