import { CartItem } from '../Interfaces/cartItemInterface';
import toast from 'react-hot-toast';

export const getCartLocal = () => {
	const cartItems: CartItem[] = [];
	const carts = localStorage.getItem('cartItems');
	if (!carts) {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		return cartItems;
	}
	return JSON.parse(carts) as Array<CartItem>;
};

export const addToCartLocal = (productId: string, productName: string, productPrice: string) => {
	const cartItems: CartItem[] = [];
	let carts = localStorage.getItem('cartItems');
	if (!carts) {
		const cartItem = {
			productId: productId,
			productName: productName,
			productPrice: productPrice,
			quantity: 1,
		};
		cartItems.push(cartItem);
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		getCartLocal();
		return toast.success('product has been added to cart');
	}
	let newCarts = JSON.parse(carts) as Array<CartItem>;
	let cart = newCarts.find((item: CartItem) => item.productId === productId);
	if (cart) {
		cart.quantity = ++cart.quantity;
		localStorage.setItem('cartItems', JSON.stringify([...newCarts]));
		getCartLocal();
		return toast.success('cart quantity was updated');
	} else {
		const updateCarts = [
			...newCarts,
			{
				productId: productId,
				productName: productName,
				productPrice: productPrice,
				quantity: 1,
			},
		];
		localStorage.setItem('cartItems', JSON.stringify(updateCarts));
		getCartLocal();
		return toast.success('Product has been added to cart');
	}
};

export const removeCartLocal = () => {
	localStorage.removeItem('cartItems');
	getCartLocal();
	return toast.success('Cart has been cleared');
};
