import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Auth } from './middleware/Auth';
import { BrowserRouter } from 'react-router-dom';
const rootElement = document.querySelector('#root') as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Auth>
        <App />
      </Auth>
    </Provider>
  </BrowserRouter>
);
