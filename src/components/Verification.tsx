import axios from '../utils/axiosInstance';
import { useState } from 'react';
import { Button, Col, Container, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Verification = () => {
	const [tokenCode, setTokenCode] = useState<string>('');
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();
	const email = localStorage.getItem('email');

	const getVerificationStatus = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(
				`/Customer/account/verify-code?email=${email}`,
				JSON.stringify(tokenCode)
			);
			setLoading(false);
			if (response.data.message) {
				navigate('/new-password');
			} else {
				setLoading(false);
				setError('Invalid OTP code');
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<>
			<Container className='d-flex justify-content-center align-items-center reset-password'>
				<Col sm={12} xs={12}>
					<h4 className='mb-4 text-center'>Reset your password verification</h4>
					<Form onSubmit={getVerificationStatus}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Please enter the Code sent to your phone</Form.Label>
							<Form.Control
								required
								type='text'
								name='phoneNumber'
								value={tokenCode}
								placeholder='Enter OTP Code'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setTokenCode(e.target.value)
								}
							/>
							{error && <small className='text-danger'>{error}</small>}
						</Form.Group>
						<div className='d-grid g-3 mt-2'>
							<Button disabled={!tokenCode} type='submit' variant='success'>
								verify code
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
