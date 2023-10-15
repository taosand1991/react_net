import { useProducts } from '../useHooks/useProducts';
import React from 'react';
import axios from '../utils/axiosInstance';
import { AuthUser } from '../useHooks/useUser';
import { DisplayProducts } from './controller/DisplayProducts';

export const HomePage = () => {
	const [products, loading] = useProducts();
	const user = AuthUser();

	const handleDelete = async (Name: string) => {
		try {
			await axios.delete(`/Product/${Name}`);
			window.location.reload();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<DisplayProducts
				loading={loading}
				user={user}
				products={products}
				handleDelete={handleDelete}
			/>
		</React.Fragment>
	);
};
