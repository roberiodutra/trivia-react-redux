import { START_GAME } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_GAME:
    return action.token;
  default:
    return state;
  }
};

export default token;
