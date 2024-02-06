import { AxiosError } from 'axios';
import axios from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { Product } from '../Interfaces/productInterface';

export const useProducts = (): (
	| Product[]
	| Boolean
	| React.Dispatch<React.SetStateAction<Product[] | undefined>>
	| undefined
)[] => {
	const [products, setProducts] = useState<Array<Product>>();
	const [loading, setLoading] = useState<Boolean>(true);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async (): Promise<void | AxiosError> => {
		try {
			const response = await axios.get('/Product');
			setProducts(response.data);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			return new AxiosError(error.mesage);
		}
	};
	return [products, loading, setProducts];
};
