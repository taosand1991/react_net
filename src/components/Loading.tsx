import { Container, Spinner, Row } from 'react-bootstrap';

export default function Loading() {
	return (
		<Container>
			<Row className='d-flex m-auto w-50 vh-100 justify-content-center align-items-center'>
				<Spinner animation='border' />
				<Spinner animation='border' />
				<Spinner animation='border' />
			</Row>
		</Container>
	);
}
