import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store';

const domNode = document.getElementById('root');

const root = ReactDOM.createRoot(domNode!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)