const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return 'teste';
  default:
    return state;
  }
};

export default token;
