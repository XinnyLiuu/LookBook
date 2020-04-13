package recipe;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.mongojack.ObjectId;

import java.util.List;

/**
 * Recipe POJO
 */
public class Recipe {
    private String id;
    private String name;
    private Long calories;
    private String description;
    private List<String> ingredients;
    private String userId; // Corresponding user

    public Recipe(String id, String name, Long calories, String description, List<String> ingredients, String userId) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.description = description;
        this.ingredients = ingredients;
        this.userId = userId;
    }

    @ObjectId
    @JsonProperty("_id")
    public String getId() {
        return id;
    }

    @ObjectId
    @JsonProperty("_id")
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCalories() {
        return calories;
    }

    public void setCalories(Long calories) {
        this.calories = calories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", calories=" + calories +
                ", description='" + description + '\'' +
                ", ingredients=" + ingredients +
                ", userId=" + userId +
                '}';
    }
}
