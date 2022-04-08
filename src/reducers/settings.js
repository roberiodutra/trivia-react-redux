import { SET_CATEGORY_ID, SET_DIFFICULTY, SET_TYPE } from '../actions';

const INITIAL_STATE = {
  categoryId: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CATEGORY_ID:
    return { ...state, categoryId: action.categoryId };
  case SET_DIFFICULTY:
    return { ...state, difficulty: action.difficulty };
  case SET_TYPE:
    return { ...state, type: action.questionType };
  default:
    return state;
  }
};

export default settings;
