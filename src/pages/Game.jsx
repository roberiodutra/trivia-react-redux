import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      position: 0,
      answers: [],
      timer: 30,
      isDisabled: false,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        this.setState({
          questions: results,
        }, () => this.randomizeAnswers());
      });
    this.start();
  }

  start = () => {
    const second = 1000;
    const interval = setInterval(this.lessTimer, second);
    this.setState({ interval });
  }

  lessTimer = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }), () => {
      const { timer, interval } = this.state;
      if (timer === 0) {
        clearInterval(interval);
        this.setState({ isDisabled: true });
      }
    });
  }

  randomizeAnswers = () => {
    const { questions, position } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[position];
    const sortNumber = 0.5;
    const answers = [...incorrectAnswers, correctAnswer]
      .sort(() => Math.random() - sortNumber);

    this.setState({
      answers,
    });
  }

  render() {
    const { questions, position, answers, timer, isDisabled } = this.state;
    return (
      <div>
        <Header />
        { questions.length > 0 && (
          <div>
            <div>
              <div>
                <h2 data-testid="question-category">{ questions[position].category }</h2>
                <p data-testid="question-text">{ questions[position].question }</p>
              </div>
              <div data-testid="answer-options">
                { answers.map((answer, index) => (
                  answer === questions[position].correct_answer
                    ? (
                      <button
                        type="button"
                        data-testid="correct-answer"
                        key={ index }
                        disabled={ isDisabled }
                      >
                        { answer }
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        data-testid={ `wrong-answer-${index}` }
                        key={ index }
                        disabled={ isDisabled }
                      >
                        { answer }
                      </button>
                    )
                ))}
                <p>{ timer }</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Game);
