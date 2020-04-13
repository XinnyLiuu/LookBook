package db;

import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import recipe.Recipe;

import java.util.ArrayList;
import java.util.List;

public class RecipeCollection extends MongoManager<Recipe>  {
    private Logger log = LoggerFactory.getLogger("db.RecipeCollection");

    public RecipeCollection(String collection, Class<Recipe> type) {
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

        FindIterable<Recipe> cursor = coll.find(Filters.eq("userId", userId));
        for(Recipe r : cursor) recipes.add(r);

        return recipes;
    }
}
