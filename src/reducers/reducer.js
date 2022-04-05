import { START_GAME } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  },
  token: '',
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case START_GAME:
        return {
          ...state,
          token: action.token,
        };
      default:
        return state;
      }
};

export default reducer;
