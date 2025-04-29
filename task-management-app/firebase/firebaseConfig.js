import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_APIKEY,
	authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
	databaseURL: process.env.EXPO_PUBLIC_DATABASEURL,
	projectId: process.env.EXPO_PUBLIC_PROJECTID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
	appId: process.env.EXPO_PUBLIC_APPID,
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

// Initialize the database
export const FirebaseDB = getDatabase(FirebaseApp);

// Initialize the storage
export const FirebaseStorage = getStorage(FirebaseApp);

// Initialize the authentication
export const FirebaseAuth = initializeAuth(FirebaseApp, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
