import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import './App.css';
import LandingPage from './componets/views/LandingPage/LandingPage'
import LoginPage from './componets/views/Loginpage/LoginPage'
import RegisterPage from './componets/views/RegisterPgae/RegisterPage'
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
