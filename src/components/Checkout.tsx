import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AuthUser } from '../useHooks/useUser';
import { useState } from 'react';
import { Address } from '../Interfaces/addressInterface';

export const Checkout = () => {
	const user = AuthUser();
	const [address, setAddress] = useState<Address>({
		streetNo: '',
		streeetName: '',
		city: '',
		postalCode: '',
		state: '',
		country: '',
	});

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const key = e.target.name as keyof Address;
		const addressCopy = { ...address };
		if (Object.keys(address).includes(key)) {
			addressCopy[key] = e.target.value;
			setAddress(addressCopy);
		}
	};

	if (user?.firstName) {
		return (
			<>
				<Container>
					<Row>
						<Col>
							<Col className='text-center'>Update Details</Col>
							<Form>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Street No</Form.Label>
									<Form.Control
										required
										name='streetNo'
										value={address.streetNo}
										type='text'
										placeholder='Enter street number'
										onChange={handleAddressChange}
									/>
								</Form.Group>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Street Name</Form.Label>
									<Form.Control
										required
										name='streetName'
										value={address.streeetName}
										type='text'
										placeholder='Enter street name'
										onChange={handleAddressChange}
									/>
								</Form.Group>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>City</Form.Label>
									<Form.Control
										required
										name='city'
										value={address.city}
										type='text'
										placeholder='Enter city name'
										onChange={handleAddressChange}
									/>
								</Form.Group>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>State</Form.Label>
									<Form.Control
										required
										name='state'
										value={address.state}
										type='text'
										placeholder='Enter your state'
										onChange={handleAddressChange}
									/>
								</Form.Group>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Postal Code</Form.Label>
									<Form.Control
										required
										name='postalCode'
										value={address.postalCode}
										type='text'
										placeholder='Enter your postal code'
										onChange={handleAddressChange}
									/>
								</Form.Group>
								<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
									<Form.Label>Country</Form.Label>
									<Form.Control
										required
										name='country'
										value={address.country}
										type='text'
										placeholder='Enter your country'
										onChange={handleAddressChange}
									/>
								</Form.Group>
								<div className='d-grid g-3'>
									<Button variant='success'>Update Address</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};
