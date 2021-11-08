import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { all_comment_url } from '../utils/constants';
import reducer from '../reducer/commentReducer';

const CommentContext = React.createContext();

const initialState = {
  comments: [],
  searchComment: [],
  comment_loadings: false,
  comment_error: false,
  single_comment: {},
  single_comment_loadings: true,
  single_comment_error: false,
  currentPage: 1,
  allPages: 1,
};
export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchComments = async (url = all_comment_url) => {
    dispatch({ type: 'GET_COMMENT_BEGIN' });
    try {
      const res = await axios(`${url}`);
      if (!res) return dispatch({ type: 'GET_COMMENT_ERROR' });
      const comments = res.data?.data?.comments;
      const isArray = comments instanceof Array;

      if (!comments || !isArray) return dispatch({ type: 'GET_COMMENT_ERROR' });
      const { currentPage, allPages } = res.data?.data;
      dispatch({ type: 'GET_COMMENT_SUCCESS', payload: { comments, currentPage, allPages } });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'GET_COMMENT_ERROR' });
    }
  };
  const fetchSingleComment = async (url) => {
    dispatch({ type: 'GET_SINGLE_COMMENT_BEGIN' });
    try {
      const res = await axios(url);
      if (!res) return dispatch({ type: 'GET_SINGLE_COMMENT_ERROR' });
      const single_comment = res.data?.data?.comment;
      const isObject = single_comment instanceof Object;

      if (!single_comment || !isObject) return dispatch({ type: 'GET_SINGLE_COMMENT_ERROR' });
      dispatch({ type: 'GET_SINGLE_COMMENT_SUCCESS', payload: { single_comment } });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'GET_SINGLE_COMMENT_ERROR' });
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    const sortBy = e.target.value;
    console.log(sortBy);
    if (sortBy === 'date-newest') fetchComments(`${all_comment_url}?sort=-createdAt`);
    if (sortBy === 'date-oldest') fetchComments(`${all_comment_url}?sort=createdAt`);
    if (sortBy === 'most-likes') fetchComments(`${all_comment_url}?sort=-likes`);
    if (sortBy === 'your-comments') fetchComments(`${all_comment_url}?createdByMe=true`);
  };

  const updateLikeCount = (comment) => {
    dispatch({ type: 'UPDATE_LIKE_COUNT', payload: { comment } });
  };

  const updateDeleteComment = (id) => {
    dispatch({ type: 'DELETE_A_COMMENT', payload: { id } });
  };

  const updateSingleComment = (comment) => {
    dispatch({ type: 'UPDATE_SINGLE_COMMENT', payload: { comment } });
  };

  const searchComment = () => {
    dispatch({ type: 'SEARCH_COMMENT', payload: {} });
  };

  const changePage = (page) => {
    console.log(page);
    dispatch({ type: 'CHANGE_PAGE', payload: { page } });
  };

  useEffect(() => {
    fetchComments(`${all_comment_url}?page=${state.currentPage}`);
  }, [state.currentPage]);

  return (
    <CommentContext.Provider
      value={{
        ...state,
        fetchComments,
        handleSort,
        fetchSingleComment,
        updateLikeCount,
        updateSingleComment,
        updateDeleteComment,
        changePage,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
