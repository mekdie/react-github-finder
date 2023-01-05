import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubAction";

const UserSearch = () => {
    const [text, setText] = useState("");

    const { users, dispatch } = useContext(GithubContext);
    const { alert, setAlert } = useContext(AlertContext);
    const handleChange = (e) => {
        setText(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text === "") {
            setAlert("Please enter something", "error");
        } else {
            dispatch({ type: "SET_LOADING" });
            const usersData = await searchUsers(text);
            dispatch({ type: "GET_USERS", payload: usersData });
            setText("");
        }
    };
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder="Search"
                                value={text}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                            <button
                                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                                type="submit"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button
                        className="btn btn-ghost btn-lg"
                        onClick={() => dispatch({ type: "CLEAR_RESULTS" })}
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserSearch;
