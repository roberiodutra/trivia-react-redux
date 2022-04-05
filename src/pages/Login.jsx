import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isEmailValid: false,
      isButtonDisabled: true,
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
        { isEmailValid: true }, () => this.activateButton(),
      );
    }
    return this.setState(
      { isEmailValid: false }, () => this.activateButton(),
    );
  }

  activateButton = () => {
    const { isEmailValid } = this.state;
    if (isEmailValid) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
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
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default connect()(Login);
