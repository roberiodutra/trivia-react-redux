import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../CSS/game.css';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      position: 0,
      answers: [],
      isAnswered: false,
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
  }

  randomizeAnswers = () => {
    const { questions, position } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[position];
    const sortNumber = 0.5;
    const answers = [...incorrectAnswers, correctAnswer]
      .sort(() => Math.random() - sortNumber); // https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/

    this.setState({
      answers,
    });
  }

  checkAnswer = () => {
    this.setState({
      isAnswered: true,
    });
  }

  nextQuestion = () => {
    const { position } = this.state;
    const nextPosition = position + 1;
    this.setState({
      position: nextPosition,
      isAnswered: false,
      answers: [] }, () => this.randomizeAnswers());
  };

  render() {
    const { questions, position, answers, isAnswered } = this.state;
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
                        className={ isAnswered ? 'verde' : 'preto' }
                        onClick={ this.checkAnswer }
                        key={ index }
                      >
                        { answer }
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        data-testid={ `wrong-answer-${index}` }
                        className={ isAnswered ? 'vermelho' : 'preto' }
                        onClick={ this.checkAnswer }
                        key={ index }
                      >
                        { answer }
                      </button>
                    )
                ))}
                { isAnswered && (
                  <button
                    onClick={ this.nextQuestion }
                    data-testid="btn-next"
                    type="button"
                  >
                    Next

                  </button>) }
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
