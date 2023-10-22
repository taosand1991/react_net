import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { UserLogin } from '../Interfaces/userLoginInterface';
import axios from 'axios';
import { User } from '../Interfaces/userInterface';
import { LoginError } from '../Interfaces/errorInterface';
import { Link } from 'react-router-dom';

export const Login = () => {
	const [userDetail, setUserDetail] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	});
	const [userReg, setUserReg] = useState<Omit<User, 'id' | 'admin'>>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phoneNumber: '',
		confirmPassword: '',
	});
	const [admin, setAdmin] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>(false);
	const [login, setLogin] = useState(false);
	const [register, setRegister] = useState(false);
	const [error, setError] = useState<LoginError>();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const copyUserDetail = { ...userDetail };
		const key = e.target.name as keyof UserLogin;
		if (Object.keys(userDetail).includes(key)) {
			copyUserDetail[key] = e.target.value;
			setUserDetail(copyUserDetail);
		}
	};

	const handleUserRegInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const copyUserReg = { ...userReg };
		const key = e.target.name as keyof Omit<User, 'id' | 'admin'>;
		if (Object.keys(copyUserReg).includes(key)) {
			copyUserReg[key] = e.target.value;
			setUserReg(copyUserReg);
		}
		if (key === 'email' && admin) {
			const splitWords = e.target.value.split('@');
			const copyError = { ...error } as LoginError;
			if (splitWords[1] !== 'legacyworld.com') {
				copyError['name'] = key;
				copyError['message'] =
					'You need to register with your work email provided to you!!';
			} else {
				delete copyError.name;
			}
			setError(copyError);
		}

		if (key === 'confirmPassword') {
			const copyError = { ...error } as LoginError;
			if (e.target.value !== userReg.password) {
				copyError['name'] = key;
				copyError['message'] = 'Password do not match !!';
			} else {
				delete copyError.name;
			}
			setError(copyError);
		}
	};

	const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setAdmin(Boolean(e.target.value));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<Response | void> => {
		e.preventDefault();
		setLoading(true);
		setLogin(true);
		try {
			const userOptions = {
				email: userDetail.email,
				password: userDetail.password,
			};
			const response = await axios.post('/Customer/login', userOptions);
			localStorage.setItem('userToken', response.data.id);
			setTimeout(() => {}, 3000);
			setLoading(false);
			setLogin(false);
			window.location.href = '/';
		} catch (error: any) {
			setLoading(false);
			setLogin(false);
			setError({ name: 'login', message: error.response.data.message });
		}
	};

	const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const key = e.target.name as keyof Omit<User, 'id' | 'admin'>;
		if (key === 'email' && admin) {
			const splitWords = e.target.value.split('@');
			const copyError = { ...error } as LoginError;
			if (splitWords[1] !== 'legacyworld.com') {
				copyError['name'] = key;
				copyError['message'] =
					'You need to register with your work email provided to you!!';
			} else {
				delete copyError.name;
			}
			setError(copyError);
		}

		if (key === 'confirmPassword') {
			const copyError = { ...error } as LoginError;
			if (e.target.value !== userReg.password) {
				copyError['name'] = key;
				copyError['message'] = 'Password do not match !!';
			} else {
				delete copyError.name;
			}
			setError(copyError);
		}
	};

	const handleRegSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<Response | void> => {
		e.preventDefault();
		setLoading(true);
		setRegister(true);
		try {
			const userOptions = {
				email: userReg.email,
				firstName: userReg.firstName,
				lastName: userReg.lastName,
				password: userReg.password,
				phoneNumber: userReg.phoneNumber,
				admin: admin,
			};
			const response = await axios.post('/Customer', userOptions);
			localStorage.setItem('userToken', response.data.id);
			setTimeout(() => {}, 3000);
			setLoading(false);
			setRegister(false);
			window.location.href = '/';
		} catch (error: any) {
			setLoading(false);
			setRegister(false);
			setError({ name: 'register', message: error.response.data.message });
		}
	};

	return (
		<>
			<Container>
				<Row>
					<Col sm={6} xs='12'>
						<h4 className='text-center p-3 mb-3'>Login to your account</h4>
						{error?.name === 'login' && (
							<Alert className='mt-2 mb-1' variant='danger'>
								{error.message}
							</Alert>
						)}
						<Form onSubmit={handleSubmit}>
							<Form.Group className='mb-2'>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='email'
									name='email'
									value={userDetail.email}
									onChange={handleInputChange}
									placeholder='Enter Email Address'
									aria-describedby='passwordHelpBlock'
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									name='password'
									type='password'
									value={userDetail.password}
									onChange={handleInputChange}
									placeholder='Enter password'
									aria-describedby='passwordHelpBlock'
								/>
								<div className='mt-2 -mb-2 text-end'>
									<p>
										forgot password?{' '}
										<Link to='/reset-password'>reset password</Link>
									</p>
								</div>
								<div className='d-grid gap-2 mt-4'>
									<Button
										disabled={
											loading || !userDetail.email || !userDetail.password
										}
										type='submit'
										variant='primary'
									>
										Login
										{loading && login && (
											<span className='ms-4'>
												<Spinner animation='grow' size='sm' />
												<Spinner animation='grow' size='sm' />
												<Spinner animation='grow' size='sm' />
											</span>
										)}
									</Button>
								</div>
							</Form.Group>
						</Form>
					</Col>
					<Col className='divider' />
					<Col xs='auto'>
						<h4 className='text-center p-3 mb-3'>
							You dont have account? <i>Sign up</i>
						</h4>
						{error?.name === 'register' && (
							<Alert className='mt-2 mb-1' variant='danger'>
								{error.message}
							</Alert>
						)}
						<Form onSubmit={handleRegSubmit}>
							<Form.Group className='d-flex'>
								<Form.Label className='flex-sm-grow-1'>Are you an admin</Form.Label>
								<Form.Check
									className='flex-sm-grow-1'
									label='Yes'
									name='Admin'
									type='radio'
									value='Yes'
									onChange={handleAdminChange}
									onBlur={handleBlurChange}
								/>

								<Form.Check
									className='flex-sm-grow-1'
									label='No'
									name='Admin'
									type='radio'
									value=''
									onChange={handleAdminChange}
								/>
							</Form.Group>
							{admin && (
								<div className='mt-2 mb-3 text-danger'>
									Please, register with email provided at legacyworld.
								</div>
							)}
							<Form.Group className='mb-2'>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter Email Address'
									aria-describedby='passwordHelpBlock'
									name='email'
									value={userReg.email}
									onChange={handleUserRegInputChange}
								/>
								{error?.name === 'email' && (
									<small className='text-danger'>{error.message}</small>
								)}
							</Form.Group>
							<Form.Group className='mb-2'>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter first name'
									aria-describedby='passwordHelpBlock'
									name='firstName'
									value={userReg.firstName}
									onChange={handleUserRegInputChange}
								/>
							</Form.Group>
							<Form.Group className='mb-2'>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter last name'
									aria-describedby='passwordHelpBlock'
									name='lastName'
									value={userReg.lastName}
									onChange={handleUserRegInputChange}
								/>
							</Form.Group>
							<Form.Group className='mb-2'>
								<Form.Label>Phone Number</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter your Phone number'
									aria-describedby='passwordHelpBlock'
									name='phoneNumber'
									value={userReg.phoneNumber}
									onChange={handleUserRegInputChange}
								/>
							</Form.Group>
							<Form.Group className='mb-2'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter password'
									aria-describedby='passwordHelpBlock'
									name='password'
									value={userReg.password}
									onChange={handleUserRegInputChange}
								/>
							</Form.Group>
							<Form.Group className='mb-2'>
								<Form.Label>Confirm password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter password'
									aria-describedby='passwordHelpBlock'
									name='confirmPassword'
									value={userReg.confirmPassword}
									onChange={handleUserRegInputChange}
								/>
								{error?.name === 'confirmPassword' && (
									<small className='text-danger'>{error.message}</small>
								)}
							</Form.Group>

							<div className='d-grid gap-2 mt-4 mb-2'>
								<Button
									type='submit'
									disabled={error?.name !== undefined}
									variant='success'
								>
									Create account
									{loading && register && (
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
				</Row>
			</Container>
		</>
	);
};
