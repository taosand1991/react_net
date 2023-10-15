import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthUser } from '../useHooks/useUser';

export const NavBar = (): JSX.Element => {
	const user = AuthUser();
	const logout = () => {
		localStorage.removeItem('userToken');
		return (window.location.href = '/');
	};

	return (
		<>
			<Navbar bg='dark' data-bs-theme='dark'>
				<Container>
					<NavLink style={{ textDecoration: 'none' }} to='/'>
						<Navbar.Brand>React .Net</Navbar.Brand>
					</NavLink>
					{user?.firstName && (
						<Nav className=''>
							<NavLink
								style={{ textDecoration: 'none', color: 'white' }}
								className='mr-2'
								to='/add-product'
							>
								Add Product
							</NavLink>
						</Nav>
					)}
					<Nav className='d-flex'>
						{user?.firstName && (
							<NavLink
								style={{ textDecoration: 'none', color: 'white' }}
								className='mr-2'
								to='#home'
							>
								Welcome user({user?.firstName} - {user?.lastName})
							</NavLink>
						)}
						{!user && (
							<NavLink
								style={{
									textDecoration: 'none',
									color: 'white',
									marginLeft: '15px',
								}}
								to='/login'
							>
								sign in
							</NavLink>
						)}
						{user !== undefined && user.firstName && (
							<NavLink
								style={{
									textDecoration: 'none',
									color: 'white',
									marginLeft: '15px',
								}}
								to='#'
								onClick={logout}
							>
								sign out
							</NavLink>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};
