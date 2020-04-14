/**
 * Authentication + Session
 */
import User from '../model/User';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    if (localStorage.getItem("isAuth") === "true") {
        return true;
    }

    return false;
}

/**
 * Adds user info into localStorage
 * 
 * We need to save the user's _id property generated from MongoDB into our session because it is used for MOST database query operations.
 */
export const setSession = (user) => {
    localStorage.setItem('id', user.getId());
    localStorage.setItem('username', user.getUsername());
    localStorage.setItem('name', user.getName());
    localStorage.setItem('isAuth', user.getIsAuth());
}

/**
 * Destroys the session
 */
export const destroySession = () => {
    localStorage.clear();
}

/**
 * Gets user info from localStorage
 */
export const getUserInfo = () => {
    return new User(
        localStorage.getItem('id'),
        localStorage.getItem('username'),
        localStorage.getItem('name'),
        localStorage.getItem('isAuth'),
    );
}
