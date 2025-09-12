// Firebase setup and utilities
// Handles all the Firebase stuff - auth, database, everything

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Firebase config - project credentials
const firebaseConfig = {
  apiKey: 'AIzaSyCL4DObZtvlopi5BmFDYNRtYsoCZRriPN8',
  authDomain: 'king-clothing-db-1e79b.firebaseapp.com',
  projectId: 'king-clothing-db-1e79b',
  storageBucket: 'king-clothing-db-1e79b.firebasestorage.app',
  messagingSenderId: '845655603123',
  appId: '1:845655603123:web:0b268bd45ede5ad919bdc6',
};

// Initialize Firebase - this sets up the connection to my Firebase project
initializeApp(firebaseConfig);

// Google sign-in setup
// This lets users sign in with their Google account
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account', // Makes user choose which Google account to use
});

// Get the auth and database instances
// These are like connections to Firebase services
export const auth = getAuth();
export const db = getFirestore();

// Google sign-in functions
// Two ways to sign in with Google - popup or redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Database utility functions
// These help me work with Firestore data efficiently

// Function to add a bunch of documents to a collection all at once
// Good for seeding data or bulk operations
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = 'title'
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // Batch writes are faster and atomic

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit(); // All changes happen together or not at all
};

// Get all the product categories and their items
// Returns an object like { hats: [...], jackets: [...], sneakers: [...] }
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'catagories'); // Note: typo in collection name
  const q = query(collectionRef);
  const snapshot = await getDocs(q);

  // Transform the Firestore data into a nice object format
  const categoryMap = snapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// User management functions
// Handle creating and managing user data in Firestore

// Create a user document when someone signs up or signs in for the first time
// This stores their info in the database so I can use it later
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; // No user? Nothing to do

  const userDocRef = doc(db, 'users', userAuth.uid); // Use Firebase UID as document ID
  const userSnapshot = await getDoc(userDocRef);

  // Only create if this user doesn't exist yet (first time signing in)
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // Any extra info like phone number
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef; // Return the document reference
};

// Authentication functions
// Handle user sign up, sign in, and sign out

// Create a new user account with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // Must have both email and password

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in an existing user
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // Must have both email and password

  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out the current user
export const signOutUser = async () => await signOut(auth);

// Listen for when users sign in or out
// This is super important - it tells my app when the user state changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
