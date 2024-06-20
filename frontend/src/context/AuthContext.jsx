import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        role: null,
        token: null,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        role: null,
        token: null,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
        error: null,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "CLEAR_TOKEN":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("role", state.role);
    localStorage.setItem("token", state.token);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user?.user || state.user,
        role: state.role,
        token: state.token,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
