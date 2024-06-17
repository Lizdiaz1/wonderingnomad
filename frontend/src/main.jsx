//import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { Modal, ModalProvider } from './context/Modal';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider as ReduxProvider } from 'react-redux';
// import './index.css';
// import App from './App';
// import configureStore from './store/store';
// import * as sessionActions from './store/session';
// import { csrfFetch, restoreCSRF } from './store/csrf';
// import { Modal, ModalProvider } from './context/Modal';

// const store = configureStore();

// if (import.meta.env.MODE !== "production") {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions;
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
// <React.StrictMode>
// 	<ModalProvider>
// 		<ReduxProvider store={store}>
// 				<App />
// 				<Modal />
// 		</ReduxProvider>
// 	</ModalProvider>
// </React.StrictMode>
//   );

// function Root() {
// 	return (
// 		<ModalProvider>
// 			<ReduxProvider store={store}>
// 				<BrowserRouter>
// 					<App />
// 					<Modal />
// 				</BrowserRouter>
// 			</ReduxProvider>
// 		</ModalProvider>
// 	);
// }

// const rootElement = document.getElementById('root');
// if (!rootElement) throw new Error('Failed to find the root element');
// const root = ReactDOM.createRoot(rootElement);

// root.render(<Root />);

// export default Root;
