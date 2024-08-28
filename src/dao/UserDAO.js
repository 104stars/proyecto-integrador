// Importing Firestore methods and the database configuration
import {
  collection, // Used to get a reference to a Firestore collection
  doc, // Used to get a reference to a Firestore document
  getDoc, // Used to fetch a document from Firestore
  deleteDoc, // Used to delete a document from Firestore
  updateDoc, // Used to update a document in Firestore
  addDoc, // Used to add a new document to Firestore
} from "firebase/firestore";
import { db } from "../../firebase.config"; // Importing the Firestore database configuration

// UserDAO class handles CRUD operations for user documents in Firestore
class UserDAO {
  constructor() {
    // Reference to the 'users' collection in Firestore
    this.collectionRef = collection(db, "users");
  }

  /**
   * Fetches a user document by its ID.
   * @param {string} id - The ID of the user document to fetch.
   * @returns {Promise<Object>} - A promise that resolves to an object containing success status and user data.
   * @throws Will throw an error if the document retrieval fails.
   */
  async getUserById(id) {
    try {
      const userDoc = await getDoc(doc(this.collectionRef, id));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, data: null };
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  /**
   * Creates a new user document in the 'users' collection.
   * @param {Object} userData - The data to be added to the new user document.
   * @returns {Promise<string>} - A promise that resolves to the ID of the newly created document.
   * @throws Will throw an error if the document creation fails.
   */
  async createUser(userData) {
    try {
      const docRef = await addDoc(this.collectionRef, userData);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

  /**
   * Updates an existing user document in the 'users' collection.
   * @param {string} id - The ID of the user document to update.
   * @param {Object} userData - The new data to update the user document with.
   * @returns {Promise<void>} - A promise that resolves when the document is successfully updated.
   * @throws Will throw an error if the document update fails.
   */
  async updateUser(id, userData) {
    const userRef = doc(this.collectionRef, id);
    try {
      await updateDoc(userRef, userData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  /**
   * Deletes a user document from the 'users' collection.
   * @param {string} id - The ID of the user document to delete.
   * @returns {Promise<void>} - A promise that resolves when the document is successfully deleted.
   * @throws Will throw an error if the document deletion fails.
   */
  async deleteUser(id) {
    try {
      await deleteDoc(doc(this.collectionRef, id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document:", error);
      throw error;
    }
  }
}

// Exporting an instance of the UserDAO class for use in other parts of the application
export default new UserDAO();
