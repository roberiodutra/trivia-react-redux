import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { saveGravatar } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    this.getGravatar();
  }

  getGravatar = () => {
    const { email, saveGravatarFunction } = this.props;
    const convertedEmail = md5(email).toString();
    const imgLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    saveGravatarFunction(imgLink);
  }

  render() {
    const { gravatar, name, score } = this.props;
    return (
      <header>
        <img
          src={ gravatar }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
  gravatar: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  gravatar: state.player.gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  saveGravatarFunction: (link) => dispatch(saveGravatar(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
