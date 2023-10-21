import { Container, Col } from 'react-bootstrap';

export const NotFound = () => {
	return (
		<Container className='d-flex justify-content-center align-items-center vh-100 vw-100'>
			<Col className='text-center'>
				<h1>Page is not found</h1>
			</Col>
		</Container>
	);
};
