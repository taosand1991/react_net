import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { AddProduct } from './components/AddProduct';
import { Login } from './components/Login';
import EditProduct from './components/EditProduct';
import { ResetPassword } from './components/ResetPassword';
import { Verification } from './components/Verification';
import { NewPassword } from './components/NewPassword';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { NotFound } from './components/NotFound';

function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route>
					<Route index element={<HomePage />} />
					<Route path='product/:id' element={<EditProduct />} />
				</Route>
				<Route path='/add-product' element={<AddProduct />} />
				<Route
					path='/login'
					element={
						<ProtectedRoute>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRoute>
							<ResetPassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/verify-code'
					element={
						<ProtectedRoute>
							<Verification />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/new-password'
					element={
						<ProtectedRoute>
							<NewPassword />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
