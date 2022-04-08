import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../CSS/game.css';
import Header from '../components/Header';
import { saveScore, updateAssertions } from '../actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      position: 0,
      answers: [],
      timer: 30,
      isDisabled: false,
      isAnswered: false,
    };
  }

  componentDidMount() {
    const { categoryId, difficulty, type } = this.props;
    let URL = 'https://opentdb.com/api.php?amount=5';
    const { token } = this.props;
    switch (true) {
    case !!categoryId:
      URL += `&category=${categoryId}&difficulty=${difficulty}&type=${type}`;
      break;
    case !!difficulty:
      URL = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=${type}`;
      break;
    case !!type:
      URL = `https://opentdb.com/api.php?amount=5&type=${type}`;
      break;
    default:
      URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
      break;
    }
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        this.setState({
          questions: results,
        }, this.randomizeAnswers);
      });
    this.start();
  }

  componentWillUnmount() {
    this.clearIntervalFunction();
  }

  start = () => {
    const second = 1000;
    const interval = setInterval(this.lessTimer, second);
    this.setState({ interval });
  }

  lessTimer = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }), () => {
      const { timer } = this.state;
      if (timer === 0) {
        this.clearIntervalFunction();
      }
    });
  }

  clearIntervalFunction = () => {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({ isDisabled: true, isAnswered: true });
  }

  randomizeAnswers = () => {
    const { questions, position } = this.state;
    const sortNumber = 0.5;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[position];
    const answers = [...incorrectAnswers, correctAnswer];
    const randomAnswers = answers.sort(() => Math.random() - sortNumber);

    if (answers.every((element, index) => element === randomAnswers[index])) {
      answers.sort(() => Math.random() - sortNumber);
    }
    // https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/
    this.setState({
      answers,
    });
  }

  checkAnswer = ({ target }) => {
    const { timer } = this.state;
    const { saveScoreFunction, updateAssertionsFunction } = this.props;
    this.setState({
      isAnswered: true,
    });
    const defaultScore = 10;
    const assertions = 1;
    let totalScore = 0;
    if (target.id === 'correct-answer') {
      switch (target.name) {
      case 'medium':
        totalScore += (defaultScore + (timer * 2));
        saveScoreFunction(totalScore);
        break;
      case 'hard':
        totalScore += (defaultScore + (timer * Number('3')));
        saveScoreFunction(totalScore);
        break;
      default:
        totalScore += (defaultScore + timer);
        saveScoreFunction(totalScore);
        break;
      }
      updateAssertionsFunction(assertions);
    }
    this.clearIntervalFunction();
  }

  // 10 + (timer * dificuldade)
  // hard: 3, medium: 2, easy: 1

  nextQuestion = () => {
    const { questions, position } = this.state;
    const { history } = this.props;
    this.start();
    const nextPosition = position + 1;
    if (position === questions.length - 1) {
      history.push('/feedback');
    }
    this.setState({
      position: nextPosition,
      isAnswered: false,
      answers: [],
      timer: 30,
      isDisabled: false }, this.randomizeAnswers);
  };

  render() {
    const { questions, position, answers, timer, isDisabled, isAnswered } = this.state;
    return (
      <div className="game">
        <Header />
        <div className="Timer">
          <p>{ timer }</p>
        </div>
        { questions.length > 0 && (
          <div>
            <div>
              <div className="Pergunta">
                <p data-testid="question-category">{ questions[position].category }</p>
                <h2 data-testid="question-text">{ questions[position].question }</h2>
              </div>
              <div data-testid="answer-options">
                {/* <div className="Respostas"> */}
                {answers.map((answer, index) => (
                  answer === questions[position].correct_answer
                    ? (
                      <button
                        type="button"
                        data-testid="correct-answer"
                        id="correct-answer"
                        className={ isAnswered ? 'verde' : 'preto' }
                        onClick={ this.checkAnswer }
                        key={ index }
                        disabled={ isDisabled }
                        name={ questions[position].difficulty }
                      >
                        {answer}
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        data-testid={ `wrong-answer-${index}` }
                        className={ isAnswered ? 'vermelho' : 'preto' }
                        onClick={ this.checkAnswer }
                        key={ index }
                        disabled={ isDisabled }
                      >
                        {answer}
                      </button>
                    )
                ))}
              </div>
              {isAnswered && (
                <button
                  onClick={ this.nextQuestion }
                  data-testid="btn-next"
                  type="button"
                >
                  Next
                </button>)}
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  saveScoreFunction: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  updateAssertionsFunction: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  categoryId: state.settings.categoryId,
  difficulty: state.settings.difficulty,
  type: state.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  saveScoreFunction: (score) => dispatch(saveScore(score)),
  updateAssertionsFunction: (assertions) => dispatch(updateAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
