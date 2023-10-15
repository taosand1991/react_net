import { AxiosError } from 'axios';
import axios from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { Category } from '../Interfaces/categoryInterface';

export const useCategories = (): (
	| Category[]
	| React.Dispatch<React.SetStateAction<Category[] | undefined>>
	| undefined
)[] => {
	const [categories, setCategories] = useState<Array<Category>>();

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async (): Promise<void | AxiosError> => {
		try {
			const response = await axios.get('/Category');
			setCategories(response.data);
		} catch (error: any) {
			return new AxiosError(error.mesage);
		}
	};
	return [categories, setCategories];
};
