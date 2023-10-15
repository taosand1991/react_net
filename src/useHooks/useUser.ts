import { AxiosError } from 'axios';
import axios from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { User } from '../Interfaces/userInterface';

export const AuthUser = () => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const userId = localStorage.getItem('userToken');

		if (userId === null || userId === undefined || !userId) {
			return false;
		} else {
			try {
				const response = await axios.get(`/Customer/${userId}`);
				setUser(response.data);
			} catch (error: any) {
				return new AxiosError(error.response.data.message);
			}
		}
	};
	return user;
};
