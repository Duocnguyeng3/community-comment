import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CommentProvider } from './context/comment_context.js';
import { InputProvider } from './context/input_context.js';
import { SingleCommentProvider } from './context/single_comment_context.js';
import { AuthProvider } from './context/auth_context.js';
import { ViewProvider } from './context/view_context.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ViewProvider>
      <AuthProvider>
        <CommentProvider>
          <InputProvider>
            <SingleCommentProvider>
              <App />
            </SingleCommentProvider>
          </InputProvider>
        </CommentProvider>
      </AuthProvider>
    </ViewProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
