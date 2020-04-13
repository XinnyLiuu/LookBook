package user;

import constants.DatabaseConstants;
import db.UserCollection;

import java.util.List;

/**
 * DAO for User objects in MongoDB
 */
public class UserDao {
    private final UserCollection userCollection;

    public UserDao(String collection, Class<User> type) {
        userCollection = new UserCollection(DatabaseConstants.USER_COLLECTION, User.class);
    }

    /**
     * Gets all users from database
     *
     * @return List of Users
     */
    public List<User> getAllUsers() {
        return userCollection.getAllFromCollection();
    }

    /**
     * Gets specified user from database
     *
     * @param id ObjectId of user
     * @return User
     */
    public User getUser(String id) {
        return userCollection.getDoc(id);
    }

    /**
     * Creates a new user
     *
     * @param user User specifics
     * @return User
     */
    public User addUser(User user) {
        return userCollection.addUser(user);
    }
}
