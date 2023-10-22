import axios from '../utils/axiosInstance';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NewPassword = () => {
	const [passwordObject, setPasswordObject] = useState<{
		password: string;
		confirmPassword: string;
	}>({ password: '', confirmPassword: '' });
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();
	const email = localStorage.getItem('email');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const key = e.target.name as keyof {
			password: string;
			confirmPassword: string;
		};
		const passObject = { ...passwordObject };
		if (Object.keys(passwordObject).includes(key)) {
			passObject[key] = e.target.value;
			setPasswordObject(passObject);
		}

		if (key === 'confirmPassword' && e.target.value !== passObject.password) {
			setError('Password do not match');
		} else {
			setError('');
		}
	};

	const setNewPassword = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(
				`/Customer/account/new-password?email=${email}`,
				passwordObject.password
			);
			setLoading(false);
			if (response.data.message) {
				localStorage.removeItem('email');
				navigate('/login');
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
					<h4 className='mb-4 text-center'>Enter New Password</h4>
					<Form onSubmit={setNewPassword}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Enter New Password</Form.Label>
							<Form.Control
								required
								type='password'
								name='password'
								value={passwordObject.password}
								placeholder='Enter Password'
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.control2'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								required
								type='password'
								name='confirmPassword'
								value={passwordObject.confirmPassword}
								placeholder='Confirm Password'
								onChange={handleChange}
							/>
							{error && <small className='text-danger'>{error}</small>}
						</Form.Group>
						<div className='d-grid g-3 mt-2'>
							<Button
								disabled={
									!passwordObject.password ||
									!passwordObject.confirmPassword ||
									error !== ''
								}
								type='submit'
								variant='success'
							>
								Change password
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
