import { Button, Col, Container, Table } from 'react-bootstrap';
import { CartItem } from '../Interfaces/cartItemInterface';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import { GrFormSubtract } from 'react-icons/gr';
import React from 'react';
import { getCartLocal } from '../utils/cartLocal';
import { currencyFormatter } from '../utils/currencyFormatter';

interface CartProps {
	decreaseCart: (productId: string) => string | undefined;
	increaseCart: (productId: string) => string | undefined;
}

export const CartPage = ({ decreaseCart, increaseCart }: CartProps) => {
	let counter = 0;
	let cartItems = getCartLocal();
	if (!cartItems || cartItems.length === 0) {
		return (
			<Container
				className='d-flex justify-content-center align-items-center'
				style={{ height: '70vh', width: '100%' }}
			>
				<Col className='text-center'>
					<h3>Your cart is empty.</h3>
					<Link to='/'>
						<Button variant='success'>Start shopping</Button>
					</Link>
				</Col>
			</Container>
		);
	}

	let total = 0;
	for (let i = 0; i < cartItems.length; i++) {
		total += cartItems[i].quantity * Number(cartItems[i].productPrice);
	}
	return (
		<>
			<Container>
				<div className='mt-3 mb-4 text-center'>
					<h2>Cart Items</h2>
				</div>
				<Table responsive striped bordered hover variant='dark' className=''>
					<thead>
						<tr>
							<th>#</th>
							<th>Product Name</th>
							<th>Product Price</th>
							<th>Quantity</th>
							<th>Sub Total</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((cart: CartItem) => {
							return (
								<React.Fragment key={cart.productId}>
									<tr>
										<td>{++counter}</td>
										<td>{cart.productName}</td>
										<td>{currencyFormatter(cart.productPrice)}</td>
										<td className='d-flex justify-content-center align-items-center'>
											<Button
												onClick={() => decreaseCart(cart.productId)}
												className='me-4'
												size='sm'
												variant='danger'
											>
												<GrFormSubtract />
											</Button>
											{cart.quantity}
											<Button
												onClick={() => increaseCart(cart.productId)}
												className='ms-4'
												size='sm'
												variant='warning'
											>
												<IoAddOutline />
											</Button>
										</td>
										<td>
											{currencyFormatter(
												cart.quantity * Number(cart.productPrice)
											)}
										</td>
									</tr>
								</React.Fragment>
							);
						})}
						<tr>
							<td
								className='text-center'
								colSpan={4}
								style={{
									fontWeight: '900',
									fontSize: '20px',
									letterSpacing: '2px',
								}}
							>
								Total
							</td>
							<td
								style={{
									fontWeight: '900',
									letterSpacing: '2px',
								}}
							>
								{currencyFormatter(total)}
							</td>
						</tr>
					</tbody>
				</Table>
				<Col className='text-end'>
					<Col>
						<Link to='/'>
							<Button variant='primary'>Continue shopping</Button>
						</Link>
						<Link to='#'>
							<Button className='ms-4' variant='success'>
								Checkout
							</Button>
						</Link>
					</Col>
				</Col>
			</Container>
		</>
	);
};
