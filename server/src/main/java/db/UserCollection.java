package db;

import com.mongodb.client.model.Filters;
import user.User;

public class UserCollection extends MongoManager<User> {

    public UserCollection(String collection, Class<User> type) {
        super(collection, type);
    }

    /**
     * Adds an user to the database
     *
     * @param user User object
     * @return Added User
     */
    public User addUser(User user) {
        coll.insertOne(user);

        // TODO: Add check to validate username

        return coll.find(Filters.eq("username", user.getUsername())).first();
    }

    /**
     * Removes an user by id from the database
     *
     * @param id ObjectId of User
     * @return User
     */
    public User removeUser(String id) {
        return deleteDoc(id);
    }
}
