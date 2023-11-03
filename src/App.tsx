import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import CounterPage from './pages/CounterPage';
import CounterSummaryPage from './pages/CounterSummaryPage';
import TodosPage from './pages/TodosPage';
import ProductsPage from './pages/ProductsPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import CartSummaryPage from './pages/CartSummaryPage';

function App() {
	const cartState = useSelector((state: RootState) => state.cartState);

	const routes = useRoutes([
		{
			path: '',
			element: (
				<>
					<nav style={{ padding: '2rem' }}>
						<Link to="/counterPage">Counter Page</Link>{' '}
						<Link to="/counterSummary">Counter Summary</Link>{' '}
						<Link to="/todos">Todos Page</Link>{' '}
						<Link to="/products"> Products Page</Link>
						<span style={{ position: 'absolute', right: '10rem' }}>
							<Link to="/cartSummary">Sepet : {cartState.cart.total} TL</Link>
							<br></br>
							Toplam Ürün Adeti : {cartState.cart.items.length}
						</span>
					</nav>

					<main style={{ padding: '2rem' }}>
						<Outlet />
					</main>
				</>
			),
			children: [
				{
					path: '/counterPage',
					Component: CounterPage,
				},
				{
					path: '/counterSummary',
					Component: CounterSummaryPage,
				},
				{
					path: '/todos',
					Component: TodosPage,
				},
				{
					path: '/products',
					Component: ProductsPage,
				},
				{
					path: '/cartSummary',
					Component: CartSummaryPage,
				},
			],
		},
	]);

	return routes;
}

export default App;
