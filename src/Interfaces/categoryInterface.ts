export interface Category {
	name: string;
	type: string;
}

export interface ICategory {
	categories: Category[];
	type: 'tag' | 'category';
}
