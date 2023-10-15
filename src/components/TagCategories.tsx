import { ICategory, Category } from '../Interfaces/categoryInterface';
import { Badge } from 'react-bootstrap';

export const TagCategories = ({ categories, type }: ICategory) => {
	const nonTagCategories =
		Array.isArray(categories) &&
		categories.filter((category: Category) => category.type === 'category');
	const tagCategories =
		Array.isArray(categories) &&
		categories.filter((category: Category) => category.type === 'tag');

	if (type === 'category') {
		return (
			<>
				{nonTagCategories &&
					nonTagCategories.map((category: Category) => {
						return (
							<Badge key={category.name} bg='warning'>
								{category.name}
							</Badge>
						);
					})}
			</>
		);
	}
	return (
		<>
			{tagCategories &&
				tagCategories.map((category: Category) => {
					return (
						<Badge
							key={category.name}
							className='ms-2'
							bg={
								category.name === 'New'
									? 'success'
									: category.name === 'On Sale'
									? 'primary'
									: 'danger'
							}
						>
							{category.name}
						</Badge>
					);
				})}
		</>
	);
};
