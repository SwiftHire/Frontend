const USER_CHANGED_EVENT = 'storage-change-user';
class TokenService {
    USER_CHANGED_EVENT = USER_CHANGED_EVENT;

    getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatchEvent(new Event(USER_CHANGED_EVENT));
    }

    removeUser() {
        localStorage.removeItem('user');
        dispatchEvent(new Event(USER_CHANGED_EVENT));
    }

    getLocalRefreshToken() {
        const user = this.getUser();
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = this.getUser();
        return user?.accessToken;
    }

    updateLocalAccessToken(token) {
        const user = this.getUser();
        user.accessToken = token;
        localStorage.setItem('user', JSON.stringify(user));
        dispatchEvent(new Event(USER_CHANGED_EVENT));
    }
}

const tokenService = new TokenService();

export default tokenService;

