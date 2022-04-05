export const START_GAME = 'START_GAME';

export const requestToken = () => ({
  type: 'REQUEST_TOKEN',
});

export const startGame = (token) => ({
  type: START_GAME,
  token,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await resolve.json();
  const myToken = token.token;
  console.log(myToken);
  dispatch(startGame(myToken));
};
