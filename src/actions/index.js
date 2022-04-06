export const START_GAME = 'START_GAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const SAVE_SCORE = 'SAVE_SCORE';

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

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await resolve.json();
  const myToken = token.token;
  dispatch(startGame(myToken));
};
