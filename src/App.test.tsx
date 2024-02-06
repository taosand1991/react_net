import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthUser } from './useHooks/useUser';

const products = [
	{
		id: '1',
		productName: 'product 1',
		productDescription: 'This is a product',
		productPrice: '100',
		customerId: 2,
		productImage: 'image.jpg',
		categories: [
			{
				name: 'phone',
				type: 'category',
			},
			{
				name: 'sales',
				type: 'tag',
			},
		],
	},
];

jest.mock('./useHooks/useUser', () => {
	return {
		AuthUser: jest.fn(),
	};
});

jest.mock('./useHooks/useProducts', () => {
	return {
		useProducts: () => {
			return [products, false, jest.fn()];
		},
	};
});

beforeEach(() => {
	jest.resetAllMocks();
});

test('Verify the homepage loads', async () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	await waitFor(() => {
		expect(screen.getByText(/React .Net/i)).toBeInTheDocument();
	});
	expect(await screen.findByText('sign in')).toBeInTheDocument();
});

test('Verify that there is a product available', async () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	await waitFor(() => {
		expect(screen.getByText(/product 1/i)).toBeInTheDocument();
	});
	expect(await screen.findByText('This is a product')).toBeInTheDocument();

	expect(await screen.findByText('$100.00')).toBeInTheDocument();

	expect(await screen.findByText('phone')).toBeInTheDocument();

	expect(await screen.findByText('sales')).toBeInTheDocument();
});

test('Verify that user was able to login', async () => {
	(AuthUser as jest.Mock).mockReturnValue({
		firstName: 'Taofeek',
		lastName: 'Adesina',
		id: '1',
		admin: false,
		email: 'ta@gmail.com',
	});
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	await waitFor(() => {
		expect(screen.getByText(/Taofeek - Adesina/i)).toBeInTheDocument();
	});
	expect(await screen.findByText('sign out')).toBeInTheDocument();
});

test('Verify that user can see or Add product button', async () => {
	(AuthUser as jest.Mock).mockReturnValue({
		firstName: 'Taofeek',
		lastName: 'Adesina',
		id: '1',
		admin: true,
		email: 'ta@gmail.com',
	});
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	await waitFor(() => {
		expect(screen.getByText('Add Product')).toBeInTheDocument();
	});
});

test('Verify that normal user cannot see or Add product Category', async () => {
	(AuthUser as jest.Mock).mockReturnValue({
		firstName: 'Taofeek',
		lastName: 'Adesina',
		id: '1',
		admin: false,
		email: 'ta@gmail.com',
	});
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	await waitFor(() => {
		expect(screen.queryByText('Add product Category')).toBeNull();
	});
});
