import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { AddProduct } from '../AddProduct';
import { CartPage } from '../CartPage';
import { CreateCategory } from '../CreateCategory';
import EditProduct from '../EditProduct';
import { ErrorPage } from '../ErrorPage';
import { HomePage } from '../HomePage';
import { Login } from '../Login';
import { NavBar } from '../NavBar';
import { NewPassword } from '../NewPassword';
import { NotFound } from '../NotFound';
import { ResetPassword } from '../ResetPassword';
import { Verification } from '../Verification';
import { CartItem } from '../../Interfaces/cartItemInterface';
import { getCartLocal } from '../../utils/cartLocal';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const Navigation = () => {
	const [id, setId] = useState<number>(0);

	const increaseCart = (productId: string): string | undefined => {
		setId(Math.random());
		let carts = getCartLocal();
		const cartItem = carts.find((cart: CartItem) => cart.productId === productId);
		if (cartItem) {
			cartItem.quantity = ++cartItem.quantity;
			localStorage.setItem('cartItems', JSON.stringify([...carts]));
			getCartLocal();
			return 'cart updated';
		}
	};

	const decreaseCart = (productId: string): string | undefined => {
		setId(Math.random());
		let carts = getCartLocal();
		let updateCarts: CartItem[];
		const cartItem = carts.find((cart: CartItem) => cart.productId === productId);
		if (cartItem) {
			if (cartItem.quantity === 1) {
				updateCarts = carts.filter((cart: CartItem) => cart.productId !== productId);
				localStorage.setItem('cartItems', JSON.stringify(updateCarts));
				getCartLocal();
				return toast.success('product has been removed from cart', { duration: 6000 });
			} else {
				cartItem.quantity = --cartItem.quantity;
				localStorage.setItem('cartItems', JSON.stringify([...carts]));
				getCartLocal();
				return 'cart updated';
			}
		}
	};

	return (
		<div>
			<NavBar />
			<Routes>
				<Route>
					<Route index element={<HomePage />} />
					<Route path='product/:id' element={<EditProduct />} />
				</Route>
				<Route path='/add-product' element={<AddProduct />} />
				<Route
					path='/cart'
					element={
						<CartPage
							key={id}
							decreaseCart={decreaseCart}
							increaseCart={increaseCart}
						/>
					}
				/>
				<Route
					path='/login'
					element={
						<ProtectedRoute>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRoute>
							<ResetPassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/verify-code'
					element={
						<ProtectedRoute>
							<Verification />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/new-password'
					element={
						<ProtectedRoute>
							<NewPassword />
						</ProtectedRoute>
					}
				/>
				<Route path='/add-category' element={<CreateCategory />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/error' element={<ErrorPage />} />
			</Routes>
		</div>
	);
};
