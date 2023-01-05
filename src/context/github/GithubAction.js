import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
    baseURL: GITHUB_URL,
});
export const searchUsers = async (text) => {
    const params = new URLSearchParams(`q=${text}`);

    const response = await github.get(`/search/users?${params}`);
    return response.data.items;
};

export const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    if (response.status === 404) {
        window.location = "/notfound";
    } else {
        const data = await response.json();
        return data;
    }
};

export const getUserRepos = async (login) => {
    const params = new URLSearchParams({ sort: "x", per_page: 10 });
    const response = await fetch(
        `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.json(); // or data.items

    return data;
};

export const getUserAndRepos = async (login) => {
    console.log("getUserAndRepos");
    const [repos, user] = await Promise.all([
        github.get(`/users/${login}/repos`), //destructing to assign returned value to repos
        github.get(`users/${login}`),
    ]);

    return { user: user.data, repos: repos.data };
};
