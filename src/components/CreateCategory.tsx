import React, { useState } from 'react';
import { Container, Col, Form, Button, Spinner, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../useHooks/useCategories';
import { Category } from '../Interfaces/categoryInterface';
import { AxiosError } from 'axios';

export const CreateCategory = () => {
	const [categories] = useCategories();
	const [categoryName, setCategoryName] = useState<string>('');
	const [categoryType, setCategoryType] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const nonTagCategories =
		Array.isArray(categories) &&
		categories.filter((category: Category) => category.type === 'category');
	const tagCategories =
		Array.isArray(categories) &&
		categories.filter((category: Category) => category.type === 'tag');

	const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCategoryName(e.target.value);
	};

	const handleCategoryType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setCategoryType(e.target.value);
	};

	const handleAddCategory = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const categoryData = {
			name: categoryName,
			type: categoryType,
		};
		setLoading(true);
		try {
			await axios.post('/Category/', categoryData);
			setLoading(false);
			navigate('/');
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleCategoryDelete = async (categoryName: string): Promise<void | AxiosError> => {
		try {
			await axios.delete(`/Category/${categoryName}`);
			window.location.reload();
		} catch (error: any) {
			return new AxiosError(error);
		}
	};

	return (
		<Container className='mt-5 d-flex flex-row justify-align-content-between align-items-center category-page'>
			<Col lg='6' className='me-lg-4 overflow-y-scroll' style={{ height: '300px' }}>
				<Col>
					<h4>List of categories</h4>
					{Array.isArray(nonTagCategories) &&
						nonTagCategories.map((category: Category) => {
							return (
								<React.Fragment key={category.name}>
									<ListGroup>
										<ListGroupItem className='mb-2 d-flex'>
											<Col>{category.name}</Col>
											<Col className='flex-grow-0'>
												<Button
													onClick={() =>
														handleCategoryDelete(category.name)
													}
													className='text-end'
													size='sm'
													variant='danger'
												>
													Delete
												</Button>
											</Col>
										</ListGroupItem>
									</ListGroup>
								</React.Fragment>
							);
						})}
				</Col>
				<Col>
					<h4>List of tags</h4>
					{Array.isArray(tagCategories) &&
						tagCategories.map((category: Category) => {
							return (
								<React.Fragment key={category.name}>
									<ListGroup>
										<ListGroupItem className='mb-2 d-flex'>
											<Col>{category.name}</Col>
											<Col className='flex-grow-0'>
												<Button
													onClick={() =>
														handleCategoryDelete(category.name)
													}
													className='text-end'
													size='sm'
													variant='danger'
												>
													Delete
												</Button>
											</Col>
										</ListGroupItem>
									</ListGroup>
								</React.Fragment>
							);
						})}
				</Col>
			</Col>
			<Col lg='6'>
				<h4 className='text-center mb-4'>Add a new category</h4>
				<Form onSubmit={handleAddCategory}>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Category Name</Form.Label>
						<Form.Control
							required
							type='text'
							name='categoryName'
							value={categoryName}
							placeholder='Enter Category Name'
							onChange={handleCategoryNameChange}
						/>
					</Form.Group>
					<Form.Select
						value={categoryType}
						onChange={handleCategoryType}
						aria-label='Default select example'
					>
						<option>Select a Product category</option>
						<option value='category'>Category</option>
						<option value='tag'>Tags</option>
					</Form.Select>
					<div className='d-grid g-3 mt-2'>
						<Button
							disabled={loading || categoryName === '' || categoryType === ''}
							type='submit'
							variant='success'
						>
							Add new category
							{loading && (
								<span className='ms-4'>
									<Spinner animation='grow' size='sm' />
									<Spinner animation='grow' size='sm' />
									<Spinner animation='grow' size='sm' />
								</span>
							)}
						</Button>
					</div>
				</Form>
			</Col>
		</Container>
	);
};
