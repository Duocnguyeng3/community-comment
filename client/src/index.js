import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CommentProvider } from './context/comment_context.js';
import { InputProvider } from './context/input_context.js';
import { SingleCommentProvider } from './context/single_comment_context.js';

ReactDOM.render(
  <CommentProvider>
    <InputProvider>
      <SingleCommentProvider>
        <App />
      </SingleCommentProvider>
    </InputProvider>
  </CommentProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
