import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCategoryId, setDifficulty, setType } from '../actions';

import { categories, difficulties, types } from '../data';

class Configurations extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryId: '',
      difficulty: '',
      type: '',
    };
  }

  onChangeSelect = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  onClickSave = () => {
    const { categoryId, difficulty, type } = this.state;
    const {
      setCategoryIdDispatch,
      setDifficultyDispatch,
      setTypeDispatch,
    } = this.props;

    setCategoryIdDispatch(categoryId);
    setDifficultyDispatch(difficulty);
    setTypeDispatch(type);
  }

  redirectToHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const categoryEntries = Object.entries(categories);
    const difficultyEntries = Object.entries(difficulties);
    const typeEntries = Object.entries(types);
    const { categoryId, difficulty, type } = this.state;
    return (
      <div>
        <div data-testid="settings-title">Configurações</div>
        <div>
          <label htmlFor="category">
            Categorias:
            <select
              id="category"
              name="categoryId"
              onChange={ this.onChangeSelect }
              value={ categoryId }
            >
              {categoryEntries.map((category, index) => (
                <option
                  key={ index }
                  value={ category[1] }
                >
                  { category[0] }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Dificuldade:
            <select
              id="difficulty"
              name="difficulty"
              onChange={ this.onChangeSelect }
              value={ difficulty }
            >
              {difficultyEntries.map((difficultyEntry, index) => (
                <option
                  key={ index }
                  value={ difficultyEntry[1] }
                >
                  { difficultyEntry[0] }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="type">
            Tipo de pergunta:
            <select id="type" name="type" onChange={ this.onChangeSelect } value={ type }>
              {typeEntries.map((typeEntry, index) => (
                <option key={ index } value={ typeEntry[1] }>{ typeEntry[0] }</option>
              ))}
            </select>
          </label>
          <button type="button" onClick={ this.onClickSave }>Salvar</button>
          <button type="button" onClick={ this.redirectToHome }>Home</button>
        </div>
      </div>
    );
  }
}

Configurations.propTypes = {
  setCategoryIdDispatch: PropTypes.func.isRequired,
  setDifficultyDispatch: PropTypes.func.isRequired,
  setTypeDispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCategoryIdDispatch: (categoryId) => dispatch(setCategoryId(categoryId)),
  setDifficultyDispatch: (difficulty) => dispatch(setDifficulty(difficulty)),
  setTypeDispatch: (type) => dispatch(setType(type)),
});

export default connect(null, mapDispatchToProps)(Configurations);
