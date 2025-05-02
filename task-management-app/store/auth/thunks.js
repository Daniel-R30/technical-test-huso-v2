import { router } from 'expo-router';
import {
	loginWithEmailPassword,
	logoutFirebaseAuth,
	registerUserWithEmailPassword,
	createUserDB,
    getUserDB,
    deleteCurrentUser
} from '../../firebase/authProviders';
import { checkingCredentials, login, logout } from './authSlice';

export const startCreateUserWithEmailPassword = ({
	displayName,
    phoneNumber,
    email,
	password,
}) => {
	return async dispatch => {
		dispatch(checkingCredentials());

		const { ok, uid, errorMessage } =
			await registerUserWithEmailPassword({
                displayName,
                email,
				password,
			});

		if (!ok) return dispatch(logout({ errorMessage }));

		await createUserDB({ uid, displayName, phoneNumber, email });
		await dispatch(login({ uid, displayName, email, phoneNumber }));

		router.replace('/');
	};
};

export const startLoginWithEmailPassword = ({ email, password }) => {
	return async dispatch => {
		dispatch(checkingCredentials());

		const { ok, uid, errorMessage } =
			await loginWithEmailPassword({ email, password });

		if (!ok) return dispatch(logout({ errorMessage }));

        const { displayName, phoneNumber } = await getUserDB(uid);        
		await dispatch(login({ uid, displayName, email, phoneNumber }));

		router.replace('/');
	};
};

export const startLoginOnAuthStateChanged =({ uid }) => {
    return async dispatch => {
        const { displayName, email, phoneNumber } = await getUserDB(uid);        
		await dispatch(login({ uid, displayName, email, phoneNumber }));

        router.replace('/');
    }
}

export const startLogout = () => {
	return async dispatch => {
		await logoutFirebaseAuth();
		dispatch(logout());
	};
};

export const startDeleteUser = () => {
    return async dispatch => {
        const { ok, message } = await deleteCurrentUser();

        if (ok) {
            return dispatch(logout());
        }

        console.log(message);
    };
}