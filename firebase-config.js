// Import the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  "storageBucket": "study2-7bdc7.firebasestorage.app",
  "authDomain": "study2-7bdc7.firebaseapp.com",
  "messagingSenderId": "320617984870",
  "appId": "1:320617984870:web:04b61ea4ee88ae057e4ea7",
  "projectId": "study2-7bdc7",
  "apiKey": "AIzaSyCVYdfql5aqHrChlA1v3nxRLkIbYyWMvUg"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Initialize Cloud Storage
const storage = getStorage(app);

// --- Authentication Helper Functions ---

// 1. Create User with Email and Password
const createUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user's display name
    await updateProfile(user, { displayName: displayName });

    // Create a user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: displayName,
      uid: user.uid,
      // Add other user data here
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error for handling in the UI
  }
};

// 2. Sign In with Email and Password
const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// 3. Sign Out
const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// 4. Sign In with Google
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      // Create a user document in Firestore if it doesn't exist
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        // Add other user data here
      });
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// --- Firestore Helper Functions ---

// 1. Get Document
const getDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null; // Document does not exist
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// 2. Get All Documents in Collection
const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting all documents:", error);
    throw error;
  }
};

// 3. Create or Update Document
const setDocument = async (collectionName, documentId, data) => {
  try {
    await setDoc(doc(db, collectionName, documentId), data);
  } catch (error) {
    console.error("Error setting document:", error);
    throw error;
  }
};

// 4. Update Document
const updateDocument = async (collectionName, documentId, data) => {
  try {
    await updateDoc(doc(db, collectionName, documentId), data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// 5. Delete Document
const deleteDocument = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// 6. Add Element to Array (arrayUnion)
const addToArray = async (collectionName, documentId, fieldName, element) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
            [fieldName]: arrayUnion(element)
        });
    } catch (error) {
        console.error("Error adding to array:", error);
        throw error;
    }
};

// 7. Remove Element from Array (arrayRemove)
const removeFromArray = async (collectionName, documentId, fieldName, element) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
            [fieldName]: arrayRemove(element)
        });
    } catch (error) {
        console.error("Error removing from array:", error);
        throw error;
    }
};

// --- Storage Helper Functions ---

// 1. Upload File to Storage
const uploadFile = async (file, storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// 2. Get File Download URL
const getFileDownloadURL = async (storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw error;
  }
};

// 3. Delete File from Storage
const deleteFile = async (storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export {
  auth,
  db,
  storage,
  createUser,
  signInUser,
  signOutUser,
  signInWithGoogle,
  getDocument,
  getAllDocuments,
  setDocument,
  updateDocument,
  deleteDocument,
  uploadFile,
  getFileDownloadURL,
  deleteFile,
  addToArray,
  removeFromArray
};