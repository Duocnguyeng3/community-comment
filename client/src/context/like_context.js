import axios from 'axios';
import React, { useContext, useReducer } from 'react';
// import reducer from '../reducer/commentReducer';
import { comment_base_url } from '../utils/constants';
import { useCommentContext } from './comment_context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'PATCH_LIKE_BEGIN': {
      return { ...state, error_message: '', patch_like_loadings: true, patch_like_error: false };
    }
    case 'PATCH_LIKE_SUCCESS': {
      return {
        ...state,
        error_message: '',
        patch_like_loadings: false,
        patch_like_error: false,
        liked_comment: action.payload.comment,
      };
    }
    case 'PATCH_LIKE_ERROR': {
      return {
        ...state,
        error_message: action.payload,
        patch_like_loadings: true,
        patch_like_error: true,
      };
    }
    default:
      throw new Error(`${action.type} is not match any action in like_context reduder`);
  }
};
const LikeContext = React.createContext();

const initialState = {
  liked_comment: {},
  patch_like_loadings: false,
  patch_like_error: false,
  error_message: '',
};
export const LikeProvider = ({ children }) => {
  const { updateLikeCount } = useCommentContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const patchLike = async (id, type) => {
    dispatch({ type: 'PATCH_LIKE_BEGIN' });
    try {
      const res = await axios.patch(`${comment_base_url}/comments/${id}`, { like: type });
      if (!res) dispatch({ type: 'PATCH_LIKE_ERROR' });
      const comment = res.data.data.comment;
      dispatch({ type: 'PATCH_LIKE_SUCCESS', payload: { comment } });
      return comment;
    } catch (err) {
      console.log(err);
      dispatch({ type: 'PATCH_LIKE_ERROR', payload: err.message });
    }
  };
  return <LikeContext.Provider value={{ ...state, patchLike }}>{children}</LikeContext.Provider>;
};

export const useLikeContext = () => {
  return useContext(LikeContext);
};
