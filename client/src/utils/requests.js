/**
 * All Client to Server requests will be listed here
 */

/**
 * Sends a GET request to the server based on the url provided
 * 
 * @param {*} url 
 * @param {*} data 
 */
export const get = async (url) => {
    try {
        const resp = await fetch(url);

        return resp;
    } catch (err) {
        throw new Error("GET request failed!")
    }
}

/**
 * Sends a POST request to the server based on the url provided
 * 
 * @param {*} url 
 * @param {*} data 
 */
export const post = async (url, data) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });

        return resp;
    } catch (err) {
        throw new Error("POST request failed!")
    }
}

/**
 * Sends a DELETE request to the server based on the url provided
 * 
 * @param {*} url 
 * @param {*} data 
 */
export const del = async (url, data) => {
    try {
        const resp = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });

        return resp;
    } catch (err) {
        throw new Error("DELETE request failed!")
    }
}

/**
 * Sends a PUT request to the server based on the url provided
 * 
 * @param {*} url 
 * @param {*} data 
 */
export const put = async (url, data) => {
    try {
        const resp = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });

        return resp;
    } catch (err) {
        throw new Error("PUT request failed!")
    }
}