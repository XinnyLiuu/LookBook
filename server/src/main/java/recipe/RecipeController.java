package recipe;

import com.fasterxml.jackson.databind.ObjectMapper;
import constants.DatabaseConstants;
import constants.HeaderConstants;
import spark.Request;
import spark.Response;
import spark.Route;
import user.User;
import user.UserDao;

import java.util.List;

/**
 * All route related methods for /api/recipe/*
 */
public class RecipeController {

    private static final RecipeDao recipeDao = new RecipeDao(
            DatabaseConstants.RECIPE_COLLECTION,
            Recipe.class
    );
    private static final UserDao userDao = new UserDao(
            DatabaseConstants.USER_COLLECTION,
            User.class
    );
    private static final ObjectMapper om = new ObjectMapper();

    /**
     * Returns all recipes in database
     */
    public static Route getAllRecipes = (Request request, Response response) -> {
        List<Recipe> recipes = recipeDao.getAllFromCollection();

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(recipes);
    };

    /**
     * Get a recipe by its id
     * Expected param:
     * id - recipeId
     */
    public static Route getRecipeById = (Request request, Response response) -> {
        String id = request.params(":id");

        Recipe recipe = recipeDao.getDoc(id);
        if (recipe == null) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(recipe);
    };

    /**
     * Gets all the recipes of a user
     * Expected param:
     * id - userId
     */
    public static Route getRecipesForUser = (Request request, Response response) -> {
        String id = request.params(":userId");

        List<Recipe> recipes = recipeDao.getAllUserRecipe(id);

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(recipes);
    };

    /**
     * Create a recipe
     * Expecting body format:
     * {
     * name: "",
     * calories: "",
     * description: "",
     * ingredients: [
     * {
     * name: "",
     * servingSize: ""
     * }
     * ],
     * userId: ""
     */
    public static Route createRecipe = (Request request, Response response) -> {
        String body = request.body();

        if (body.isEmpty()) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        Recipe recipe = om.readValue(body, Recipe.class);

        // Check if user exists
        if (!userDao.checkIfUserExists(recipe.getUserId())) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "User does not exist!";
        }

        // Add recipe
        recipe = recipeDao.addRecipe(recipe);

        // Collection returns null if recipe exists for user
        if (recipe == null) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Recipe exists for user";
        }

        response.status(201);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(recipe);
    };

    /**
     * Delete a recipe by their id
     * Expected param:
     * id - recipeId
     */
    public static Route deleteRecipe = (Request request, Response response) -> {
        String id = request.params(":id");

        Recipe recipe = recipeDao.deleteDoc(id);

        if (recipe == null) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        response.status(200);
        response.type(HeaderConstants.JSON);
        return String.format("Deleted recipe with id: %s", id);
    };

    /**
     * Update an recipe by their id
     * This method REPLACES the original, so it is IMPORTANT that all of the recipe's properties are present. Also, it returns the original document.
     * Expecting body format:
     * {
     * _id : "",
     * name: "",
     * calories: "",
     * description: "",
     * ingredients: [
     * {
     * name: "",
     * servingSize: ""
     * }
     * ],
     * userId: ""
     */
    public static Route updateRecipe = (Request request, Response response) -> {
        String body = request.body();

        if (body.isEmpty()) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Bad Request";
        }

        Recipe recipe = om.readValue(body, Recipe.class);
        recipe = recipeDao.updateDoc(recipe.getId(), recipe);

        if (recipe == null) {
            response.status(400);
            response.type(HeaderConstants.JSON);
            return "Failed to update";
        }

        response.status(200);
        response.type(HeaderConstants.JSON);
        return om.writeValueAsString(recipe);
    };
}
