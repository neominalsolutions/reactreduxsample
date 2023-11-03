import React from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../store/store';
import { decrement, increment } from '../store/reducers/CounterReducer';

function CounterPage() {
	// UI tarafından bir action tetiklemek için useDispatch Hook
	const dispatch = useDispatch<RootDispatch>();
	// const {increment,decrement} = useContext(CounterContext);
	const onIncrement = () => {
		dispatch(increment());
	};

	const onDecrement = () => {
		dispatch(decrement()); // dispatch ile counter reducer içerisinde increment decrement actionlarını çağır.
	};

	return (
		<>
			<button onClick={onIncrement}>(+)</button>
			<button onClick={onDecrement}>(-)</button>
		</>
	);
}

export default CounterPage;
