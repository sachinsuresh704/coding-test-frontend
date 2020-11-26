import React, { useReducer } from "react";
import { UserContext } from "./user.context";
const INITIAL_STATE = {
    isAuthenticated: false,
    token: null,
    user: [],
    files: [],
    filteredData: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "SIGNIN":
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            };
        case "SIGNOUT":
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        case "USER_DETAILS":
            return {
                ...state,
                user: action.payload,
            };
        case "LIST_FILES":
            return {
                ...state,
                files: action.payload,
            };
        case "ADD_TO_FILES":
            return {
                ...state,
                files: [...state.files, action.payload],
            };
        case "FILTER_FILES":
            let value = action.payload;
            let filteredData = [];
            if (value.length) {
                filteredData = state.files.filter((item) => {
                    let startsWithCondition = item.fileName.toString().toLowerCase().startsWith(value.toLowerCase());

                    let includesCondition = item.fileName.toString().toLowerCase().startsWith(value.toLowerCase());
                    if (startsWithCondition) {
                        return startsWithCondition;
                    } else if (!startsWithCondition && includesCondition) {
                        return includesCondition;
                    } else return null;
                });
                return { ...state, filteredData: [...filteredData] };
            } else {
                filteredData = state.files;
                return { ...state, files: [...filteredData] };
            }
        default:
            return state;
    }
}

export const UserProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
    return <UserContext.Provider value={{ authState, authDispatch }}>{children}</UserContext.Provider>;
};
