import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { HomePage } from '../components/HomePage';
import { AddProduct } from '../components/AddProduct';
import Loading from '../components/Loading';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path='/'
				element={
					<Suspense fallback={<Loading />}>
						<HomePage />
					</Suspense>
				}
			/>
			<Route path='/add=product' element={<AddProduct />} />
		</Route>
	)
);
