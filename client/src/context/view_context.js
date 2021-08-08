import React, { useContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      const { type, message } = action.payload;
      return { ...state, notificationShow: true, type, message };
    }
    case 'CLOSE_NOTIFICATION': {
      return { ...state, notificationShow: false, type: '', message: '' };
    }
    default:
      throw new Error(`${action.type} is not match any action in view reduder`);
  }
};

const ViewContext = React.createContext();
const initialState = {
  notificationShow: false,
  message: '',
  type: '',
};
export const ViewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showNotification = (type, message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: { type, message } });
  };
  const closeNotification = (type, message) => {
    dispatch({ type: 'CLOSE_NOTIFICATION' });
  };

  return (
    <ViewContext.Provider value={{ ...state, showNotification, closeNotification }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  return useContext(ViewContext);
};
