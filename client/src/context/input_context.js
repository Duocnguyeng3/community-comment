import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
// import reducer from '../reducer/commentReducer';
import { comment_base_url } from '../utils/constants';
import { useAuthContext } from './auth_context';
import { useViewContext } from './view_context.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TITLE': {
      return {
        ...state,
        new_comment: { ...state.new_comment, title: action.payload.value },
      };
    }
    case 'UPDATE_TEXT': {
      return {
        ...state,
        new_comment: { ...state.new_comment, comment: action.payload.value },
      };
    }
    case 'POST_COMMENT_BEGIN': {
      return { ...state, error_message: '', new_comment_loadings: true };
    }
    case 'SET_ERROR_MESSAGE': {
      return {
        ...state,
        new_comment_loadings: false,
        new_comment_error: false,
        error_message: action.payload.message,
      };
    }
    case 'POST_COMMENT_SUCCESS': {
      return {
        ...state,
        new_comment_loadings: false,
        new_comment: { title: '', comment: '' },
      };
    }
    case 'POST_COMMENT_ERROR': {
      return { ...state, new_comment_loadings: false };
    }

    default:
      throw new Error(`${action.type} is not match any action in input_context reduder`);
  }
};
const InputContext = React.createContext();

const initialState = {
  new_comment: {
    title: '',
    comment: '',
  },
  new_comment_loadings: false,
  error_message: '',
};
export const InputProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showNotification } = useViewContext();
  const { user } = useAuthContext();

  const checkCommentObject = (e) => {
    e.preventDefault();
    const title = state.new_comment.title;
    const comment = state.new_comment.comment;
    const titlePass = title.length > 5 && title.length < 40;
    const commentPass = comment.length < 10000;
    if (titlePass && commentPass) return { title, comment };
    dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: { message: 'The title must be between 10 and 40 character' },
    });
  };

  const postComment = async (url, commentObj) => {
    if (!commentObj) return;
    dispatch({ type: 'POST_COMMENT_BEGIN' });
    try {
      const res = await axios.post(url, {
        ...commentObj,
        createdBy: { userId: user._id, userName: user.name },
      });
      if (!res) dispatch({ type: 'POST_COMMENT_ERROR' });
      const comment = res.data.data.comment;
      dispatch({ type: 'POST_COMMENT_SUCCESS', payload: { comment } });
      return comment;
    } catch (err) {
      console.log(err);
      dispatch({ type: 'POST_COMMENT_ERROR' });
      showNotification('fail', err.response?.data?.message || 'There was an error');
    }
  };

  const updateInput = (e) => {
    // console.log(e.target.name);
    const value = e.target.value;
    if (e.target.name === 'title') {
      dispatch({ type: 'UPDATE_TITLE', payload: { value } });
    }
    if (e.target.name === 'comment') {
      dispatch({ type: 'UPDATE_TEXT', payload: { value } });
    }
  };

  return (
    <InputContext.Provider value={{ ...state, updateInput, checkCommentObject, postComment }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => {
  return useContext(InputContext);
};
