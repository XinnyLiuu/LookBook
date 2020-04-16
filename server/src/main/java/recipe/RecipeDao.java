package recipe;

import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;
import db.MongoManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * DAO for User collection interaction
 */
public class RecipeDao extends MongoManager<Recipe> {

    private final Logger log = LoggerFactory.getLogger("recipe.RecipeDao");

    public RecipeDao(String collection, Class<Recipe> type) {
        super(collection, type);
    }

    /**
     * Adds a recipe for the user into the database
     *
     * @param recipe Recipe object
     * @return Added recipe
     */
    public Recipe addRecipe(Recipe recipe) {
        // Check that the user does not already have this recipe
        Recipe r = coll.find(Filters.and(
                Filters.eq("userId", recipe.getUserId()),
                Filters.eq("name", recipe.getName())
                )
        ).first();

        // Recipe already exists for this user
        if (r != null) return null;

        coll.insertOne(recipe);
        return coll.find(Filters.and(
                Filters.eq("userId", recipe.getUserId()),
                Filters.eq("name", recipe.getName())
                )
        ).first();
    }

    /**
     * Gets all the recipe belonging to an user
     *
     * @param userId User's id
     * @return List of recipes belonging to an user
     */
    public List<Recipe> getAllUserRecipe(String userId) {
        List<Recipe> recipes = new ArrayList<>();

        log.debug(String.format("RECIPE FOR USER: %s", userId));

        FindIterable<Recipe> cursor = coll.find(Filters.eq("userId", userId));
        for (Recipe r : cursor) recipes.add(r);

        return recipes;
    }

    /**
     * Removes a recipe for a specified user
     *
     * @param recipeId Recipe's id
     * @param userId   User's id
     * @return Deleted recipe
     */
    public Recipe deleteUserRecipe(String recipeId, String userId) {
        // Check if there is an existing recipe
        Recipe target = coll.find(Filters.and(
                Filters.eq("_id", recipeId),
                Filters.eq("userId", userId)
        )).first();

        if (target == null) return null;

        // Otherwise, remove this target recipe
        target = deleteDoc(recipeId);

        return target;
    }
}
