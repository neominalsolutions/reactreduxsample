// Reducer veya Slice olarak isimlendirebilirsiniz.

import { createSlice } from '@reduxjs/toolkit';

// string literal type
type CounterStatus = 'increment' | 'reset' | 'decrement' | 'initial';

export type CounterState = {
	count: number;
	status: CounterStatus;
};

const initialState: CounterState = {
	count: 0,
	status: 'initial',
};

// THEME_FORECOLOR
// THEME_BGCOLOR
export const CounterReducer = createSlice({
	name: 'COUNTER',
	initialState,
	reducers: {
		// senkron client state değişimi için kullanırız
		increment: (state: CounterState) => {
			// increment action tanımlamış olduk
			state.count += 1;
			state.status = 'increment';
		},
		decrement: (state: CounterState) => {
			state.count -= 1;
			state.status = 'decrement';
		}, // reset ve incrementByAmount
	},
});

// slice action ve reducer tek bir kod blogunda yönetmemizi sağlayan bir feature

// slice içinde reducers olarak tanımlanan actionlara dispatch edebilmek için erişmem lazım o yüzden actionları export ediyoruz.
// object deconstruction işlemi.
export const { increment, decrement } = CounterReducer.actions;

export default CounterReducer.reducer;
