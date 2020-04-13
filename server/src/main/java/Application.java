import constants.HeaderConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;
import user.UserController;

import static spark.Spark.*;

public class Application {
    private static Logger log = LoggerFactory.getLogger("Application");

    public static void main(String[] args) {
        // Config server
        port(8000);

        // API routes
        path("/api", () -> {
            // User API
            path("/user", () -> {
                // Get all users
                get("/all", UserController.getAllUsers);

                // Get an user by id
                get("/:id", UserController.getUserById);

                // Get an user by username + password
                post("/login", UserController.loginUser);

                // Create new user
                post("/register", UserController.createUser);

                // Delete an user
                delete("/:id", UserController.deleteUser);

                // Updates an user
                put("/update", UserController.updateUser);
            });
        });

        // Bad requests
        get("*", errorRoute); // Send 404
    }

    /**
     * Returns bad request
     */
    private static final Route errorRoute = (Request request, Response response) -> {
        response.status(400);
        response.type(HeaderConstants.JSON);
        return "Bad Request";
    };
}
