import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../actions';

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

  handleSubmit = (event) => {
    const { getToken, history } = this.props;
    event.preventDefault();
    getToken();
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
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
