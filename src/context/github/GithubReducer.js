const githubReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "GET_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case "GET_REPOS":
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };
        //set loading to true
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "CLEAR_RESULTS":
            return {
                ...state,
                users: [],
            };
        case "GET_USER_AND_REPOS":
            console.log("reducer return to state");
            return {
                //get the previous state then update the user, repos, and loading  value with object spread operator
                // https://stackoverflow.com/questions/49491393/using-spread-operator-to-update-an-object-value
                ...state,
                user: action.payload.user,
                repos: action.payload.repos,
                loading: false,
            };
        default:
            return state;
    }
};

export default githubReducer;
