import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Configure from './Configure'

function App() {
  const [messagesSent, setMessagesSent] = useState(0);
  const [messagesFailed, setMessagesFailed] = useState(0);
  const [averageTime, setAverageTime] = useState(0);

  useEffect(() => {
    fetch('/update').then(res => res.json()).then(data => {
      setMessagesSent(data.sent);
      setMessagesFailed(data.failed);
      setAverageTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link className="App-link" to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/configure">configure</Link>
          </div>
          <Switch>
            <Route exact path="/">
                <img src={logo} className="App-logo" alt="logo" />
            </Route>
            <Route path='/monitor'>
                <h1>Monitor</h1>
                <br />
                <h2>Messages Sent: {messagesSent}</h2>
                <h2>Messages Failed: {messagesFailed}</h2>
                <h2>Average Send Time: {averageTime}</h2>
            </Route>
            <Route path="/configure">
                <Configure />;
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
