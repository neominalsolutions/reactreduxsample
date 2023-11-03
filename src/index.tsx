import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// useState, useEffect, useLayoutEffect, useRef, useMemo, useCallBack, useReducer, useContext, useRoutes, useSelector, useDispatch, React Memo, useCustomHook, useForm, useQuery

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const client = new QueryClient();

// Provider ile store daki state bilgisine herhangi bir yerden erişim sağlayabilirim.

root.render(
	// <React.StrictMode>
	// <CounterProvider></CounterProvider>
	<Provider store={store}>
		<BrowserRouter>
			<QueryClientProvider client={client}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
