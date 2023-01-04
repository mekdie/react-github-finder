import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    //get initial users and testing purposes
    const fetchUsers = async () => {
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users`);
        const data = await response.json();

        // setUsers(data);
        // setLoading(false);

        //dispatch an action with the reducer
        dispatch({ type: "GET_USERS", payload: data });
    };

    const searchUsers = async (text) => {
        setLoading();
        // const params = new URLSearchParams({ q: text });
        // or
        const params = new URLSearchParams(`q=${text}`);
        // console.log(params.getAll("q"));
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
        // console.log(response);
        const { items } = await response.json(); // or data.items

        dispatch({ type: "GET_USERS", payload: items });
    };

    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`);
        // console.log(response);
        if (response.status === 404) {
            window.location = "/notfound";
        } else {
            const data = await response.json();
            dispatch({ type: "GET_USER", payload: data });
        }
    };

    const getUserRepos = async (login) => {
        setLoading();

        const params = new URLSearchParams({ sort: "x", per_page: 10 });
        const response = await fetch(
            `${GITHUB_URL}/users/${login}/repos?${params}`
        );
        const data = await response.json(); // or data.items

        dispatch({ type: "GET_REPOS", payload: data });
    };

    const clearResults = () => {
        dispatch({ type: "CLEAR_RESULTS" });
    };
    const setLoading = () => dispatch({ type: "SET_LOADING" });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearResults,
                getUser,
                getUserRepos,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
