package user;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.mongojack.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * User POJO
 */
public class User {
    private String id;
    private String name;
    private String username;
    private String password;
    private List<String> recipes;

    public User() {
    }

    public User(String id, String name, String username, String password, List<String> recipes) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.recipes = recipes;
    }

    public User(String name, String username, String password, List<String> recipes) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.recipes = new ArrayList<>();
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<String> recipes) {
        this.recipes = recipes;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", recipes=" + recipes +
                '}';
    }
}
