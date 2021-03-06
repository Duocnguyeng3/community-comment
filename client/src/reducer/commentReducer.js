const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_COMMENT_BEGIN': {
      return { ...state, comment_loadings: true, comment_error: false };
    }
    case 'GET_COMMENT_SUCCESS': {
      const { currentPage, allPages, comments } = action.payload;
      return {
        ...state,
        comment_loadings: false,
        comment_error: false,
        comments,
        currentPage,
        allPages,
      };
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
    case 'UPDATE_LIKE_COUNT': {
      const commentUpdate = action.payload.comment;
      const newComments = state.comments.map((cmt) => {
        if (cmt._id === commentUpdate._id) return commentUpdate;
        return cmt;
      });
      return { ...state, comments: newComments };
    }
    case 'UPDATE_SINGLE_COMMENT': {
      return {
        ...state,
        single_comment_loadings: false,
        single_comment_error: false,
        single_comment: { ...state.single_comment, ...action.payload.comment },
      };
    }

    case 'DELETE_A_COMMENT': {
      const id = action.payload.id;
      const newComments = state.comments.filter((cmt) => cmt._id !== id);
      return { ...state, comments: newComments };
    }

    case 'CHANGE_PAGE': {
      const { page } = action.payload;
      return { ...state, currentPage: page };
    }

    default:
      return state;
  }
};

export default reducer;
