import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Home, Error, CommentPage, CreateCommentPage, Login, Signup, PrivateRoute } from './pages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NotificationPopup } from './components';
function App() {
  return (
    <div className="App">
      <NotificationPopup />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/comment/:id" children={<CommentPage />} />
          <PrivateRoute exact path="/create-comment">
            <CreateCommentPage />
          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
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
