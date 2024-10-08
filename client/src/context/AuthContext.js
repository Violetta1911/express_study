import { createContext } from "react";

export const AuthContext = createContext({
    token: null,
    userId: null,
    isAuthenticated: false,
    login: function () { },
    logout: function () { }
})