const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "ADD_USER":
      return { ...state, user: action.user };
    case "REMOVE_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
