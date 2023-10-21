import axios from '../utils/axiosInstance';
import { useState } from 'react';
import { Button, Col, Container, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
	const [email, setEmail] = useState<string>('');
	const [loading, setLoading] = useState<boolean>();
	const navigate = useNavigate();

	const getEmailStatus = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		localStorage.setItem('email', email);
		try {
			setLoading(true);
			const response = await axios.post('/Customer/account/reset-password', email);
			setLoading(false);
			if (response.data.message) {
				navigate('/verify-code');
			} else {
				alert('Email is not registered in the database!!!');
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<>
			<Container
				className='d-flex justify-content-center align-items-center'
				style={{ height: '60vh', width: '50%' }}
			>
				<Col>
					<h4 className='mb-4 text-center'>Reset your password</h4>
					<Form onSubmit={getEmailStatus}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Please Enter your email</Form.Label>
							<Form.Control
								required
								type='email'
								name='email'
								value={email}
								placeholder='Enter your registered email'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
							/>
						</Form.Group>
						<div className='d-grid g-3 mt-2'>
							<Button disabled={!email} type='submit' variant='success'>
								Reset Password
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
		</>
	);
};
