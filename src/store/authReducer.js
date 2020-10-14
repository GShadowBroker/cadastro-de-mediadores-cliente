const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      if (!action.user) return state;
      return { isAuthenticated: true, user: action.user };
    case "LOGOUT":
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const login = (user) => ({
  type: "LOGIN",
  user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export default authReducer;
