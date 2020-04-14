/**
 * Class representing User. 
 * 
 * Matches the POJO object from the Spark server
 */
class User {
	constructor(id, username, name, isAuth) {
		this.id = id;
        this.username = username;
        this.name = name;
        this.isAuth = isAuth;
	}

	getId() {
		return this.id;
	}

	getUsername() {
		return this.username;
	}

    getName() {
        return this.name;
    }

	getIsAuth() {
		return this.isAuth;
	}
}

export default User;