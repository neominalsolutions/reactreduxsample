import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function CounterSummaryPage() {
	// state seçimleri için kullanılan Hook
	// Tetiklenen action sonucunda güncel state bilgisini storedan okumak içi useSelector Hook kullanıyoruz.
	let counterState = useSelector((state: RootState) => state.counter);
    // const {counterState} = useContext(CounterContext); ContextAPI daki karşılığı

	return (
		<>
			Sayac: {counterState.count} Durum: {counterState.status}
		</>
	);
}

export default CounterSummaryPage;
