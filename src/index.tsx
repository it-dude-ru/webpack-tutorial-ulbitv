import {createRoot} from 'react-dom/client';
import { App } from './components/App';

const root = document.getElementById('root');
console.log('root = ', root);

if (!root) {
	throw new Error('root div not found');
}

const container = createRoot(root);

container.render(<App />); 