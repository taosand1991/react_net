import { PropsWithChildren } from 'react';
import { AuthUser } from '../useHooks/useUser';
import { Navigate, useMatch } from 'react-router-dom';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
	const user = AuthUser();
	const newPassword = useMatch('new-password');
	const verifyCode = useMatch('verify-code');
	const email = localStorage.getItem('email');
	if (user?.firstName) {
		return <Navigate to='/' replace />;
	} else if (newPassword && !email) {
		return <Navigate to='/login' replace />;
	} else if (verifyCode && !email) {
		return <Navigate to='/login' replace />;
	}
	return children as JSX.Element;
};
