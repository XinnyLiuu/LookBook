package db;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import constants.DatabaseConstants;
import org.mongojack.JacksonMongoCollection;

import java.util.ArrayList;
import java.util.List;

/**
 * Class used for MongoDB interactions
 */
abstract class MongoManager<T> {

    public final MongoCollection<T> coll;

    public MongoManager(String collection, Class<T> type) {
        // Start connection
        MongoClient mongoClient = MongoClients.create();

        // Query database for all users
        coll = JacksonMongoCollection.builder().build(
                mongoClient,
                DatabaseConstants.DATABASE,
                collection,
                type
        );
    }

    /**
     * Gets all documents from a collection
     *
     * @return List of documents
     */
    public List<T> getAllFromCollection() {
        List<T> data = new ArrayList<>();

        FindIterable<T> cursor = coll.find();
        for (T c : cursor) {
            data.add(c);
        }

        return data;
    }

    /**
     * Returns the document based on its id
     *
     * @param id ObjectId of document
     * @return Document
     */
    public T getDoc(String id) {
        return coll.find(Filters.eq("_id", id)).first();
    }

    /**
     * Deletes the document based on its id
     *
     * @param id ObjectId of document
     * @return Document
     */
    public T deleteDoc(String id) {
        return coll.findOneAndDelete(Filters.eq("_id", id));
    }

    /**
     * Updates the document based on its id and object
     *
     * @param doc Document with fields to
     * @param id  ObjectId of document
     * @return Document
     */
    public T updateDoc(String id, T doc) {
        return coll.findOneAndReplace(Filters.eq("_id", id), doc);
    }
}
