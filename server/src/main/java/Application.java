import constants.HeaderConstants;
import recipe.RecipeController;
import spark.Request;
import spark.Response;
import spark.Route;
import user.UserController;

import static spark.Spark.*;

public class Application {
    /**
     * Returns bad request
     */
    private static final Route errorRoute = (Request request, Response response) -> {
        response.status(404);
        response.type(HeaderConstants.JSON);
        return "Not Found";
    };

    public static void main(String[] args) {
        // Config server
        port(8000);

        // Enable CORS
        options("*", (request, response) -> {
                    String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
                    if (accessControlRequestHeaders != null) {
                        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
                    }

                    String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
                    if (accessControlRequestMethod != null) {
                        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
                    }

                    return "OK";
                });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

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

            // Recipe API
            path("/recipe", () -> {
                // Get all recipes
                get("/all", RecipeController.getAllRecipes);

                // Get an recipe by id
                get("/:id", RecipeController.getRecipeById);

                // Get all recipes for an user
                get("/user/:userId", RecipeController.getRecipesForUser);

                // Create a new recipe
                post("/add", RecipeController.createRecipe);

                // Delete a recipe
                delete("/:recipeId/:userId", RecipeController.deleteRecipe);

                // Updates a recipe
                put("/update", RecipeController.updateRecipe);
            });
        });

        // Bad requests
        get("*", errorRoute); // Send 404
    }
}
