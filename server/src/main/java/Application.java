import user.UserController;

import static spark.Spark.*;

public class Application {
    public static void main(String[] args) {
        // Config server
        port(8000);

        // Routes
        get("/hello", (req, res) -> "Hello World!");

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
            });
        });

        // Any other routes not specified above
        get("*", (req, res) -> "Path not Found");
    }
}
