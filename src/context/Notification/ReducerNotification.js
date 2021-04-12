const ReducerNotification = (state, action) => {
  const initialState = { type: "", message: "" };
  const { payload } = action;

  switch (action.type) {
    case "ADD_NOTIFICATION":
      return { type: payload.type, message: payload.message,exitPopup: false };
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export default ReducerNotification;
