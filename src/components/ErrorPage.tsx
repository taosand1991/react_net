import { useParams } from 'react-router-dom';

export const ErrorPage = () => {
	const params = useParams();
	console.log(params);
	return <h5>hello</h5>;
	// if (error.message) {
	// 	return (
	// 		<Container>
	// 			<Col>
	// 				<h1>500 Error Request</h1>
	// 				<h5>There is an error in getting the request!!!. Try again later</h5>
	// 			</Col>
	// 		</Container>
	// 	);
	// }
	// return null;
};
