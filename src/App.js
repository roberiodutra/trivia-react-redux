import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Configurations from './pages/Configurations';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/configurations" component={ Configurations } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
