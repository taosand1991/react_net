import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HomePageProps, Product } from '../../Interfaces/productInterface';
import { getImageUrl } from '../../utils/imageFinder';
import Loading from '../Loading';
import { TagCategories } from '../TagCategories';
import { addToCartLocal } from '../../utils/cartLocal';
import { AddToCart } from '../AddToCart';
import { useState } from 'react';

export const DisplayProducts = ({ loading, products, user, handleDelete }: HomePageProps) => {
	const [productId, setProductId] = useState<string>('');
	return (
		<>
			<AddToCart key={productId} />
			{loading && <Loading />}
			{!loading && Array.isArray(products) && products.length > 0 ? (
				<Container>
					<Row>
						<h2 className='text-center p-3'>List of our products</h2>
						{Array.isArray(products) &&
							products.map((product: Product) => {
								return (
									<Col xs='12' lg='4' key={product.productName} className='mb-3'>
										<Card className='product-card'>
											<Card.Img
												width={200}
												height={200}
												style={{
													backgroundRepeat: 'no-repeat',
													objectFit: 'cover',
												}}
												variant='top'
												src={
													product.productImage
														? product.productImage
														: getImageUrl(product.productName)
												}
											/>
											<Card.Body>
												<Row>
													<Col>
														<Card.Title>
															{product.productName}
														</Card.Title>
													</Col>
													<Col md='auto'>
														<TagCategories
															categories={product.categories}
															type='category'
														/>
													</Col>
												</Row>

												<Card.Text>{product.productDescription}</Card.Text>
											</Card.Body>
											<Card.Body>
												<Row>
													<Col>
														<Card.Text
															style={{
																fontSize: '15px',
																fontWeight: 700,
															}}
														>
															$
															{Number(product.productPrice).toFixed(
																2
															)}
														</Card.Text>
													</Col>
													<Col>
														<Button
															onClick={() => {
																addToCartLocal(
																	product.id,
																	product.productName,
																	product.productPrice
																);
																setProductId(product.id);
															}}
															color='blue'
														>
															Add to cart
														</Button>
													</Col>
												</Row>
											</Card.Body>
											<Card.Body>
												<Row>
													<Col>
														<TagCategories
															categories={product.categories}
															type='tag'
														/>
													</Col>
												</Row>
											</Card.Body>
											{user?.id === product.customerId || user?.admin ? (
												<Card.Body>
													<Row>
														<Col>
															<Button size='sm' variant='warning'>
																<Link
																	style={{
																		textDecoration: 'none',
																		color: 'black',
																	}}
																	to={`product/${product.id}`}
																>
																	Edit Product
																</Link>
															</Button>
														</Col>
														<Col>
															<Button
																onClick={() =>
																	handleDelete(
																		product.productName
																	)
																}
																size='sm'
																variant='danger'
															>
																Delete Product
															</Button>
														</Col>
													</Row>
												</Card.Body>
											) : null}
										</Card>
									</Col>
								);
							})}
					</Row>
				</Container>
			) : (
				<Container
					className='d-flex justify-content-center align-items-center'
					style={{ height: '40vw', fontWeight: 900, textAlign: 'center' }}
				>
					{user ? (
						<Col>There are no products yet!. Please add some products</Col>
					) : (
						<Col>There are no products yet!. Sign In and add some products</Col>
					)}
				</Container>
			)}
		</>
	);
};
