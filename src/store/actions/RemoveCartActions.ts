import { PayloadAction } from '@reduxjs/toolkit';
import { CartState } from '../reducers/CartReducer';

export const removeCartItemAction = (
	state: CartState,
	action: PayloadAction<number>
) => {
	// UI Logic
};
