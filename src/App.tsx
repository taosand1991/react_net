import { Navigation } from './components/controller/Navigation';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
			<Navigation />;
			<Toaster position='top-center' />
		</>
	);
}

export default App;
