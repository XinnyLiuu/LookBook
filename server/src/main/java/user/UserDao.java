package user;

import com.mongodb.client.model.Filters;
import db.MongoManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import user.User;

public class UserDao extends MongoManager<User> {

    private Logger log = LoggerFactory.getLogger("user.UserDao");
    public UserDao(String collection, Class<User> type) {
        super(collection, type);
    }

    /**
     * Adds an user to the database
     *
     * @param user User object
     * @return Added User
     */
    public User addUser(User user) {
        // Check if the username exists in the database
        String username = user.getUsername();
        User u = coll.find(Filters.eq("username", username)).first();

        // Username is taken
        if (u != null) {
            return null;
        }

        coll.insertOne(user);
        return coll.find(Filters.eq("username", user.getUsername())).first();
    }

    /**
     * Returns user information based on their username and password
     *
     * @param username Username
     * @param password Password
     * @return User
     */
    public User getUserByUsernamePassword(String username, String password) {
        return coll.find(Filters.and(
                Filters.eq("username", username),
                Filters.eq("password", password)
                )
        ).first();
    }
}
