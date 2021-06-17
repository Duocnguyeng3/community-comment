import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { all_comment_url } from '../utils/constants';
import reducer from '../reducer/commentReducer';

const CommentContext = React.createContext();

const initialState = {
  comments: [],
  comment_loadings: false,
  comment_error: false,
  single_comment: {},
  single_comment_loadings: true,
  single_comment_error: false,
};
export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchComments = async (url) => {
    dispatch({ type: 'GET_COMMENT_BEGIN' });
    try {
      const res = await axios(url);
      if (!res) dispatch({ type: 'GET_COMMENT_ERROR' });
      const comments = res.data.data.comments;
      dispatch({ type: 'GET_COMMENT_SUCCESS', payload: { comments } });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'GET_COMMENT_ERROR' });
    }
  };
  const fetchSingleComment = async (url) => {
    dispatch({ type: 'GET_SINGLE_COMMENT_BEGIN' });
    try {
      const res = await axios(url);
      if (!res) dispatch({ type: 'GET_SINGLE_COMMENT_ERROR' });
      const single_comment = res.data.data.comment;
      dispatch({ type: 'GET_SINGLE_COMMENT_SUCCESS', payload: { single_comment } });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'GET_SINGLE_COMMENT_ERROR' });
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    const sortBy = e.target.value;
    if (sortBy === 'date-newest') fetchComments(`${all_comment_url}?sort=-createdAt`);
    if (sortBy === 'date-oldest') fetchComments(`${all_comment_url}?sort=createdAt`);
    if (sortBy === 'most-likes') fetchComments(`${all_comment_url}?sort=-likes`);
  };

  const updateLikeCount = (comment) => {
    dispatch({ type: 'UPDATE_LIKE_COUNT', payload: { comment } });
  };

  const updateSingleLikeCount = (comment) => {
    dispatch({ type: 'UPDATE_SINGLE_LIKE_COUNT', payload: { comment } });
  };

  useEffect(() => {
    fetchComments(all_comment_url);
  }, []);

  return (
    <CommentContext.Provider
      value={{
        ...state,
        fetchComments,
        handleSort,
        fetchSingleComment,
        updateLikeCount,
        updateSingleLikeCount,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
