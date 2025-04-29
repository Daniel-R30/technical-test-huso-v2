import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
    deleteUser
} from 'firebase/auth';
import { FirebaseAuth, FirebaseDB } from './firebaseConfig';
import { get, ref, set } from 'firebase/database';

export const createUserDB = async ({ uid, displayName, phoneNumber, email }) => {
    try {
        const userRef = ref(FirebaseDB, 'users/' + uid);

        await set(userRef, { uid, displayName, phoneNumber, email });

        return {
            ok: true,
        }
        
    } catch (error) {
        const errorMessage = error.message;

        console.error('Error creating user in DB:', errorMessage);
        return {
            ok: false,
            errorMessage,
        }
    }

};

export const getUserDB = async uid => {
    try {
        const userRef = ref(FirebaseDB, 'users/' + uid);
        const snapshot = await get(userRef);
    
        if (snapshot.exists()) {

            const { uid, displayName, phoneNumber, email } = snapshot.val();
            return {
                ok: true,
                uid,
                displayName,
                phoneNumber,
                email,
            }
        } else {
            console.log('No data available');
            return {
                ok: false,
                errorMessage: 'No data available',
            };
        }
        
    } catch (error) {
        const errorMessage = error.message;
        console.error('Error getting user from DB:', errorMessage);
        return {
            ok: false,
            errorMessage,
        };
    }
}

export const registerUserWithEmailPassword = async ({displayName, email, password}) => {
	try {
		const response = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid } = response.user;

		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
		};

	} catch (error) {
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
		};
	}
};

export const loginWithEmailPassword = async ({ email, password }) => {
	try {
		const result = await signInWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);

		const { uid } = result.user;

		return {
			ok: true,
			uid,
		};
	} catch (error) {
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
		};
	}
};

export const logoutFirebaseAuth = async () => {
    try {
        await FirebaseAuth.signOut();

        return {
            ok: true,
        }
        
    } catch (error) {
        const errorMessage = error.message;
        console.error('Error logging out:', errorMessage);

        return {
            ok: false,
            errorMessage,
        }; 
    }
};

export const deleteCurrentUser = async () => {
    try {
        const user = FirebaseAuth.currentUser;
        await deleteUser(user);

        return {
            ok: true,
            message: 'User deleted successfully',
        }

    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        };
    }
};
