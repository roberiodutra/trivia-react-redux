import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { saveScore } from '../actions';

class Feedback extends React.Component {
  componentDidMount() {
    this.saveRank();
  }

  saveRank = () => {
    const { name, score, picture } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      return localStorage
        .setItem('ranking', JSON.stringify([...ranking, { name, score, picture }]));
    }
    return localStorage.setItem('ranking', JSON.stringify([{ name, score, picture }]));
  }

  feedbackMessage = () => {
    const { assertions } = this.props;
    const minQuestions = 3;
    switch (true) {
    case assertions >= minQuestions:
      return 'Well Done!';
    default:
      return 'Could be better...';
    }
  }

  redirectToHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking = (event) => {
    const { saveScoreFunction } = this.props;
    const defaultScore = 0;
    event.preventDefault();
    const { history } = this.props;
    saveScoreFunction(defaultScore);
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <section>
          <h2 data-testid="feedback-text">{ this.feedbackMessage() }</h2>
          <h3
            data-testid="feedback-total-question"
          >
            {assertions}
          </h3>
          <h3
            data-testid="feedback-total-score"
          >
            {score}
          </h3>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectToHome }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectToRanking }
          >
            Ranking
          </button>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: state.player.gravatar,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  saveScoreFunction: (score) => dispatch(saveScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
