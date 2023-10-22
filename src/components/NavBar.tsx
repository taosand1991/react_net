import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthUser } from '../useHooks/useUser';
import { useState } from 'react';

export const NavBar = (): JSX.Element => {
	const user = AuthUser();
	const [open, setOpen] = useState<boolean>(false);
	const logout = () => {
		localStorage.removeItem('userToken');
		return (window.location.href = '/');
	};

	const openModal = () => {
		setOpen(!open);
	};

	return (
		<>
			<nav className='navbar navbar-dark bg-dark mobile-nav'>
				<div className='container-fluid'>
					<button className='navbar-toggler' type='button' onClick={openModal}>
						<span className='navbar-toggler-icon'></span>
					</button>

					<NavLink style={{ textDecoration: 'none', display: 'flex' }} to='/'>
						<Navbar.Brand>React .Net</Navbar.Brand>
					</NavLink>
				</div>
				{open && (
					<div className='d-block w-100 mt-3  bg-gradient' style={{ fontSize: '20px' }}>
						{user?.firstName && (
							<Nav className='d-block m-2'>
								<NavLink
									style={{ textDecoration: 'none', color: 'white' }}
									className='mr-2'
									to='/add-product'
								>
									Add Product
								</NavLink>
							</Nav>
						)}
						<Nav className='m-2'>
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
										margin: '2px',
									}}
									to='/login'
								>
									Sign in
								</NavLink>
							)}
							{user !== undefined && user.firstName && (
								<NavLink
									style={{
										textDecoration: 'none',
										color: 'white',
										width: '100%',
										margin: '2px',
									}}
									to='#'
									onClick={logout}
								>
									Sign out
								</NavLink>
							)}
						</Nav>
					</div>
				)}
			</nav>
			<Navbar bg='dark' data-bs-theme='dark' className='nav-content-custom'>
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
