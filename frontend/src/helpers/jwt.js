const TOKEN_KEY = "TEAMCOLLAB_TOKEN";

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}