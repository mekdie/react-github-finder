import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

const UserSearch = () => {
    const [text, setText] = useState("");

    const { users, searchUsers, clearResults } = useContext(GithubContext);
    const handleChange = (e) => {
        setText(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (text === "") {
            alert("Please enter something in the search bar");
        } else {
            // @todo - search Users
            searchUsers(text);
            setText("");
        }
    };
    const handleClear = () => {
        clearResults();
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
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserSearch;
