import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
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
    // falta implementar a  função de resetar o estado
  }

  redirectToRanking = (event) => {
    event.preventDefault();
    const { history } = this.props;
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
            {`Você acertou ${assertions} questões!`}
          </h3>
          <h3
            data-testid="feedback-total-score"
          >
            {`Um total de ${score} pontos.`}
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
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
