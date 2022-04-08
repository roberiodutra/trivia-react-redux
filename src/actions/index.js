export const START_GAME = 'START_GAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const SAVE_SCORE = 'SAVE_SCORE';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const SET_CATEGORY_ID = 'SET_CATEGORY_ID';
export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const SET_TYPE = 'SET_TYPE';

export const requestToken = () => ({
  type: 'REQUEST_TOKEN',
});

export const startGame = (token) => ({
  type: START_GAME,
  token,
});

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveName = (name) => ({
  type: SAVE_NAME,
  name,
});

export const saveGravatar = (gravatar) => ({
  type: SAVE_GRAVATAR,
  gravatar,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const updateAssertions = (assertions) => ({
  type: UPDATE_ASSERTIONS,
  assertions,
});

export const setCategoryId = (categoryId) => ({
  type: SET_CATEGORY_ID,
  categoryId,
});

export const setDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  difficulty,
});

export const setType = (questionType) => ({
  type: SET_TYPE,
  questionType,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await resolve.json();
  const myToken = token.token;
  dispatch(startGame(myToken));
};
