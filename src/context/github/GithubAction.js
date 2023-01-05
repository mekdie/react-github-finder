const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const searchUsers = async (text) => {
    const params = new URLSearchParams(`q=${text}`);
    // console.log(params.getAll("q"));
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    // console.log(response);
    const { items } = await response.json(); // or data.items

    return items;
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
