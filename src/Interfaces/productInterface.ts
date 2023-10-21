import { Category } from './categoryInterface';
import { User } from './userInterface';

export interface Product {
	id: string;
	productName: string;
	productDescription: string;
	productPrice: string;
	customerId: number;
	productImage: string;
	categories: Array<Category>;
}

export interface ProductProps {
	name: string;
}

export interface HomePageProps {
	loading:
		| Boolean
		| Product[]
		| React.Dispatch<React.SetStateAction<Product[] | undefined>>
		| undefined;
	products:
		| Boolean
		| Product[]
		| React.Dispatch<React.SetStateAction<Product[] | undefined>>
		| undefined;
	user: User | undefined;
	handleDelete: (Name: string) => Promise<void>;
}
