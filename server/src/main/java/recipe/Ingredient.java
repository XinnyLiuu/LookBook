package recipe;

/**
 * Ingredient for recipe POJO
 *
 * JSON - {
 *      name: "",
 *      servingSize: ""
 * }
 */
public class Ingredient {
    private String name;
    private String servingSize;

    public Ingredient() { }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getServingSize() {
        return servingSize;
    }

    public void setServingSize(String servingSize) {
        this.servingSize = servingSize;
    }
}
