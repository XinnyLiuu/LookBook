import constants.HeaderConstants;
import spark.Request;
import spark.Response;
import spark.Route;
import user.UserController;

import static spark.Spark.*;

public class Application {
    public static void main(String[] args) {
        // Config server
        port(8000);

        // API routes
        path("/api", () -> {
            path("/user", () -> {
                // Get all users
                get("/all", UserController.getAllUsers);

                // Get an user
                get("/:id", UserController.getUserById);

                // Create new user
                post("/add", UserController.createUser);

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
