package user;

import com.fasterxml.jackson.databind.ObjectMapper;
import constants.DatabaseConstants;
import constants.HeaderConstants;
import db.UserCollection;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;

public class UserController {

    private static final UserCollection collection = new UserCollection(
            DatabaseConstants.USER_COLLECTION,
            User.class
    );
    private static final ObjectMapper om = new ObjectMapper();

    /**
     * Returns all users in database
     */
    public static Route getAllUsers = (Request request, Response response) -> {
        List<User> users = collection.getAllFromCollection();

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(users);
    };

    /**
     * Get an user by their id
     *
     * Expected param:
     * id - userId
     */
    public static Route getUserById = (Request request, Response response) -> {
        String id = request.params(":id");

        User user = collection.getDoc(id);
        if (user == null) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(user);
    };

    /**
     * Create an user
     *
     * Expecting body format:
     * {
     *      "name": "",
     *      "username": "",
     *      "password" : "",
     *      "recipes" : []
     * }
     */
    public static Route createUser = (Request request, Response response) -> {
        String body = request.body();

        if (body.isEmpty()) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        User user = om.readValue(body, User.class);
        user = collection.addUser(user);

        response.status(201);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(user);
    };

    /**
     * Delete an user by their id
     *
     * Expected param:
     * id - userId
     */
    public static Route deleteUser = (Request request, Response response) -> {
        String id = request.params(":id");

        User user = collection.deleteDoc(id);

        if (user == null) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        response.status(200);
        response.type(HeaderConstants.JSON);
        return String.format("Deleted user with id: %s", id);
    };

    /**
     * Update an user by their id
     *
     * This method REPLACES the original, so it is IMPORTANT that all of the user's properties are present. Also, it returns the original document.
     *
     * Expecting body format:
     * {
     *      "_id": "",
     *      "name": "",
     *      "username": "",
     *      "password" : "",
     *      "recipes": []
     * }
     */
    public static Route updateUser = (Request request, Response response) -> {
        String body = request.body();

        if (body.isEmpty()) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        User user = om.readValue(body, User.class);
        user = collection.updateUser(user.getId(), user);

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(user);
    };
}
