const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_COMMENT_BEGIN': {
      return { ...state, comment_loadings: true, comment_error: false };
    }
    case 'GET_COMMENT_SUCCESS': {
      return { ...state, comment_loadings: false, comment_error: false, comments: action.payload.comments };
    }
    case 'GET_COMMENT_ERROR': {
      return { ...state, comment_loadings: false, comment_error: true };
    }
    case 'GET_SINGLE_COMMENT_BEGIN': {
      return { ...state, single_comment_loadings: true, single_comment_error: false };
    }
    case 'GET_SINGLE_COMMENT_SUCCESS': {
      return {
        ...state,
        single_comment_loadings: false,
        single_comment_error: false,
        single_comment: action.payload.single_comment,
      };
    }
    case 'GET_SINGLE_COMMENT_ERROR': {
      return { ...state, single_comment_loadings: false, single_comment_error: true };
    }

    default:
      return state;
  }
};

export default reducer;
