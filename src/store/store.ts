import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './reducers/CounterReducer';

export const store = configureStore({
	reducer: {
		counter: CounterReducer,
	}, // statlerin store tanımlandığı yer. // soldaki counter state ismi sağdaki state güncelleyecek olan function
});

// stordaki bütün satateleri RootState tipi ile erişeceğim
export type RootState = ReturnType<typeof store.getState>;

// herhangi bir state değiştirmek için kullanacağımız Dispatch type
export type RootDispatch = typeof store.dispatch;