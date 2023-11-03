import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import CounterPage from './pages/CounterPage';
import CounterSummaryPage from './pages/CounterSummaryPage';

function App() {
	const routes = useRoutes([
		{
			path: '',
			element: (
				<>
					<nav style={{ padding: '2rem' }}>
						<Link to="/counterPage">Counter Page</Link>{' '}
						<Link to="/counterSummary">Counter Summary</Link>
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
			],
		},
	]);

	return routes;
}

export default App;
