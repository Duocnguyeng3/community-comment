import axios from 'axios';
import React, { useContext, useReducer } from 'react';
// import reducer from '../reducer/commentReducer';
import { comment_base_url } from '../utils/constants';
import { useViewContext } from './view_context.js';
import { useAuthContext } from './auth_context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'PATCH_LIKE_BEGIN': {
      return { ...state, patch_like_loadings: true, patch_like_error: false };
    }
    case 'PATCH_LIKE_SUCCESS': {
      return {
        ...state,
        patch_like_loadings: false,
        patch_like_error: false,
        liked_comment: action.payload.comment,
      };
    }
    case 'PATCH_LIKE_ERROR': {
      return {
        ...state,
        patch_like_loadings: false,
        patch_like_error: true,
      };
    }
    case 'DELETE_BEGIN': {
      return { ...state, delete_loadings: true, delete_error: false };
    }
    case 'DELETE_SUCCESS': {
      return { ...state, delete_loadings: false, delete_error: false };
    }
    case 'DELETE_ERROR': {
      return {
        ...state,
        delete_loadings: false,
        delete_error: true,
      };
    }
    default:
      throw new Error(`${action.type} is not match any action in like_context reduder`);
  }
};
const SingleCommentContext = React.createContext();

const initialState = {
  liked_comment: {},
  patch_like_loadings: false,
  patch_like_error: false,
  delete_loadings: false,
  delete_error: false,
};
export const SingleCommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showNotification } = useViewContext();
  const { user } = useAuthContext();

  const patchLike = async (id, type) => {
    dispatch({ type: 'PATCH_LIKE_BEGIN' });
    try {
      const res = await axios.patch(`${comment_base_url}/comments/${id}/react?reaction=${type}`);
      if (!res) dispatch({ type: 'PATCH_LIKE_ERROR' });
      const comment = res.data.data.comment;
      dispatch({ type: 'PATCH_LIKE_SUCCESS', payload: { comment } });
      return comment;
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: 'PATCH_LIKE_ERROR' });
      showNotification('fail', err.response?.data?.message || 'There was an error');
    }
  };

  const deleteComment = async (id) => {
    dispatch({ type: 'DELETE_BEGIN' });
    try {
      const res = await axios.delete(`${comment_base_url}/comments/${id}`);
      if (!res) dispatch({ type: 'DELETE_ERROR' });
      dispatch({ type: 'DELETE_SUCCESS' });
      return 'success';
    } catch (err) {
      console.log(err);
      dispatch({ type: 'DELETE_ERROR' });
      showNotification('fail', err.response?.data?.message || 'There was an error');
    }
  };

  return (
    <SingleCommentContext.Provider value={{ ...state, patchLike, deleteComment }}>
      {children}
    </SingleCommentContext.Provider>
  );
};

export const useSingleCommentContext = () => {
  return useContext(SingleCommentContext);
};
