import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, saveEmail, saveName } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isEmailValid: false,
      isButtonDisabled: true,
      email: '',
    };
  }

  validateName = ({ target }) => {
    this.setState({ name: target.value });
  }

  validateEmail = ({ target }) => {
    const { name } = this.state;
    const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (target.value.match(mailformat) && name) {
      return this.setState(
        { isEmailValid: true, email: target.value }, () => this.activateButton(),
      );
    }
    return this.setState(
      { isEmailValid: false, email: target.value }, () => this.activateButton(),
    );
  }

  activateButton = () => {
    const { isEmailValid } = this.state;
    if (isEmailValid) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  }

  handleSubmit = (event) => {
    const { email, name } = this.state;
    const { getToken, history, saveEmailFunction, saveNameFunction } = this.props;
    event.preventDefault();
    saveEmailFunction(email);
    saveNameFunction(name);
    getToken();
    saveEmailFunction(email);
    saveNameFunction(name);
    history.push('/game');
  }

  onClickRedirect = (event) => {
    const { history } = this.props;
    event.preventDefault();

    history.push('/configurations');
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="name-input"
            onChange={ this.validateName }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            onChange={ this.validateEmail }
          />
        </label>
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
        <button
          data-testid="btn-settings"
          type="submit"
          onClick={ this.onClickRedirect }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  saveEmailFunction: (email) => dispatch(saveEmail(email)),
  saveNameFunction: (name) => dispatch(saveName(name)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getToken: PropTypes.func.isRequired,
  saveEmailFunction: PropTypes.func.isRequired,
  saveNameFunction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
