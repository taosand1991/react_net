import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useCategories } from '../useHooks/useCategories';
import { Category } from '../Interfaces/categoryInterface';
import React, { useState } from 'react';
import { Product } from '../Interfaces/productInterface';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const AddProduct = (): JSX.Element => {
	const [categories] = useCategories();
	const [product, setProduct] = useState<Omit<Product, 'id'>>({
		productName: '',
		productPrice: '',
		productDescription: '',
		productImage: '',
		customerId: 0,
		categories: [],
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [category, setCategory] = useState<Category>({ name: '', type: '' });
	const navigate = useNavigate();

	const nonTagCategories =
		Array.isArray(categories) &&
		categories.filter((category: Category) => category.type === 'category');
	const tagCategories =
		Array.isArray(categories) &&
		categories.filter((category: Category) => category.type === 'tag');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const productCopy = { ...product };
		const key = e.target.name as keyof Omit<Product, 'customerId' | 'categories' | 'id'>;
		if (Object.keys(productCopy).includes(key)) {
			productCopy[key] = e.target.value;
			setProduct(productCopy);
		}
	};

	const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setCategory({ name: e.target.value, type: 'category' });
	};

	const handleSelectTags = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const index = product.categories.findIndex((category) => category.name === e.target.value);
		if (index !== -1 && !e.target.checked) {
			product.categories.splice(index, 1);
			setProduct((product) => {
				return {
					...product,
					categories: [...product.categories],
				};
			});
		} else {
			setProduct((product) => {
				return {
					...product,
					categories: [...product.categories, { name: e.target.value, type: 'category' }],
				};
			});
		}
	};

	const handleSubmit = async (
		e: React.ChangeEvent<HTMLFormElement>
	): Promise<Response | void> => {
		e.preventDefault();
		setLoading(true);
		const customerId = Number(localStorage.getItem('userToken'));
		try {
			console.log(category);
			product.categories.push(category);
			const productData = { ...product, customerId: customerId };
			console.log(productData);
			await axios.post('/Product', productData);
			setProduct({
				productName: '',
				productPrice: '',
				productDescription: '',
				categories: [],
				customerId: 0,
				productImage: '',
			});
			setCategory({ name: '', type: '' });
			setLoading(false);
			navigate('/');
		} catch (error: any) {
			setLoading(false);
			console.log(error);
			alert(error.response.data);
		}
	};

	return (
		<Container className='mt-5'>
			<h4 className='text-center mb-4'>Add a new product</h4>
			<Row>
				<Col>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								required
								type='text'
								name='productName'
								value={product.productName}
								placeholder='Enter product Name'
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Product Description</Form.Label>
							<Form.Control
								required
								name='productDescription'
								value={product.productDescription}
								as='textarea'
								rows={3}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Product Image Link</Form.Label>
							<Form.Control
								type='text'
								name='productImage'
								value={product.productImage}
								placeholder='Enter product Image Link'
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Col>
				<Col>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Product price</Form.Label>
							<Form.Control
								required
								name='productPrice'
								value={product.productPrice}
								type='number'
								placeholder='Enter product Price'
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Select
							value={category.name}
							onChange={handleSelectCategory}
							aria-label='Default select example'
						>
							<option>Select a Product category</option>
							{Array.isArray(nonTagCategories) &&
								nonTagCategories.map((category: Category) => {
									return <option key={category.name}>{category.name}</option>;
								})}
						</Form.Select>
						<Form.Group className='mt-3'>
							<Form.Label>Select Product Tags</Form.Label>
							{Array.isArray(tagCategories) &&
								tagCategories.map((category: Category) => {
									return (
										<Form.Check
											onChange={handleSelectTags}
											key={category.name}
											label={category.name}
											name='tag'
											type='checkbox'
											id={category.name}
											value={category.name}
										/>
									);
								})}
						</Form.Group>
					</Form>
				</Col>
			</Row>
			<Form onSubmit={handleSubmit}>
				<div className='d-grid g-3 mt-2'>
					<Button
						disabled={loading || category.name === ''}
						type='submit'
						variant='success'
					>
						Add Product
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
		</Container>
	);
};
