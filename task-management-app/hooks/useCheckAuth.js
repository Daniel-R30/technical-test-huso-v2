import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/firebaseConfig';
import { startLoginOnAuthStateChanged } from '../store/auth/thunks';

export const useCheckAuth = () => {
	const { status } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async user => {
			if (!user) return dispatch(logout({}));

			const { uid } = user;

            if(status !== 'authenticated') dispatch(startLoginOnAuthStateChanged({ uid }));

		});
	}, []);

	return status;
};
