import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { AddProduct } from './components/AddProduct';
import { Login } from './components/Login';
import EditProduct from './components/EditProduct';

// const EditProduct = React.lazy(() => import('./components/EditProduct'));

function App() {
	useEffect(() => {}, []);

	return (
		<div className='App'>
			<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/add-product' element={<AddProduct />} />
				<Route path='/:id' element={<EditProduct />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
