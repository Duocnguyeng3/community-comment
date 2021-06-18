import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Home, Error, CommentPage, CreateCommentPage } from './pages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/comment/:id" children={<CommentPage />} />
          <Route exact path="/create-comment">
            <CreateCommentPage />
          </Route>
          <Route exact path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
