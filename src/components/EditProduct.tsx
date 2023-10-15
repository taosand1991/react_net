import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Category } from '../Interfaces/categoryInterface';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../Interfaces/productInterface';
import axios from 'axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Omit<Product, 'customerId' | 'id'>>();
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const key = e.target.name as keyof Omit<Product, 'customerId' | 'categories' | 'id'>;
		const productCopy = { ...product } as Product;

		if (Object.keys(productCopy).includes(key)) {
			productCopy[key] = e.target.value;
			setProduct(productCopy);
		}
	};

	const handleUpdate = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const customerId = Number(localStorage.getItem('userToken'));
		const id = params.id;

		const productData = { ...product, customerId: customerId, id: id };

		try {
			setLoading(true);
			await axios.put(`/Product/${params.id}`, productData);
			setLoading(false);
			navigate('/');
		} catch (error: any) {
			setLoading(false);
			console.log(error);
		}
	};

	const getProduct = useCallback(async (): Promise<Product | undefined> => {
		try {
			setLoading(true);
			const response = await axios.get(`Product/${params.id}`);
			console.log(response.data);
			setProduct(response.data);
			setLoading(false);
			return response.data;
		} catch (error: any) {
			setLoading(false);
			console.log(error.response.data.message);
		}
	}, [params.id]);

	useEffect(() => {
		getProduct();
	});

	return (
		<>
			{loading && <Loading />}
			{!loading && (
				<Container className='mt-5'>
					<h4 className='text-center mb-4'>Edit a product</h4>
					<Row>
						<Col>
							<Form>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Product Name</Form.Label>
									<Form.Control
										required
										type='email'
										name='productName'
										value={product && product?.productName}
										placeholder='Enter product Name'
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group
									className='mb-3'
									controlId='exampleForm.ControlTextarea1'
								>
									<Form.Label>Product Description</Form.Label>
									<Form.Control
										required
										name='productDescription'
										value={product?.productDescription}
										as='textarea'
										rows={3}
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
										value={product?.productPrice}
										type='number'
										placeholder='Enter product Price'
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Select
									disabled
									value={
										product &&
										product.categories &&
										product.categories.filter(
											(category) => category.type === 'category'
										)[0].name
									}
									aria-label='Default select example'
								>
									<option>
										{product &&
											product.categories &&
											product.categories.filter(
												(category) => category.type === 'category'
											)[0].name}
									</option>
								</Form.Select>
								<Form.Group className='mt-3'>
									<Form.Label>Product Tags</Form.Label>
									{product &&
										product.categories &&
										Array.isArray(product?.categories) &&
										product.categories
											.filter((category) => category.type === 'tag')
											.map((category: Category) => {
												return (
													<Form.Check
														key={category.name}
														label={category.name}
														name='tag'
														type='checkbox'
														id={category.name}
														value={category.name}
														checked={true}
														disabled
													/>
												);
											})}
								</Form.Group>
							</Form>
						</Col>
					</Row>
					<Form onSubmit={handleUpdate}>
						<div className='d-grid g-3 mt-2'>
							<Button disabled={loading} type='submit' variant='success'>
								Update Product
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
			)}
		</>
	);
};

export default EditProduct;
