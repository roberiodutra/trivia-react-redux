import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Configurations from './pages/Configurations';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/configurations" component={ Configurations } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
