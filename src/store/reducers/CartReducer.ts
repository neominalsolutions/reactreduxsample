import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { removeCartItemAction } from '../actions/RemoveCartActions';

export interface Cart {
	items: CartItem[];
	total: number;
}

export interface CartItem {
	id: number;
	quantity: number;
	name: string;
	listPrice: number;
}

export type CartState = {
	cart: Cart;
};

const cartInitial: CartState = {
	cart: { items: [], total: 0 },
};

const calculateTotal = (items: CartItem[]) => {
	let total = 0;

	items.forEach((item: CartItem) => {
		total += item.quantity * item.listPrice;
	});

	return total;
};

const CartReducer = createSlice({
	name: 'CART',
	initialState: cartInitial,
	reducers: {
		addToCart: (
			// her bir sepete eklemede sadece 1 adet ürün giriyoruz.
			state: CartState,
			action: PayloadAction<{ id: number; name: string; listPrice: number }>
		) => {
			// aynı id sahip bir ürün sepette varsa
			// adetini 1 artıtalım
			// yoksa yeni ürün ekleylim
			// aynı id ye sahip 5 adetten fazla ürün olduğu durumda isCriticalStock state true yapsın
			const sameProductExist = state.cart.items.find(
				(x) => x.id === action.payload.id
			);

			if (sameProductExist) {
				if (sameProductExist.quantity >= 5) {
					window.alert('Bir üründen en falza 5 adet eklenebilir');
				} else {
					sameProductExist.quantity += 1;

					window.alert('Sepetteki ürün adeti güncellendi');
				}
			} else {
				const cartItem: CartItem = {
					id: action.payload.id,
					name: action.payload.name,
					listPrice: action.payload.listPrice,
					quantity: 1,
				};

				window.alert('Sepette yeni bir ürün eklendi');

				state.cart.items = [...state.cart.items, cartItem];
			}

			state.cart.total = calculateTotal(state.cart.items);
		},
		removeCartItem: (state: CartState, action: PayloadAction<number>) => {
			// id si olan ürünün hepsini sil
			removeCartItemAction(state, action);
			// örnek olarak burada stateden item silme işlemi yapalım.
		},
		updateCartItem: (
			state: CartState,
			action: PayloadAction<{ quantity: number; id: number }>
		) => {
			const existingCartItem = state.cart.items.find(
				(x) => x.id === action.payload.id
			);

			if (existingCartItem) {
				existingCartItem.quantity = action.payload.quantity;
			}

			state.cart.total = calculateTotal(state.cart.items);

			// id'sine göre kaç adet güncelleyeceğimize dair bir kontrol yapalım.
			// negatif değer seçilince uyarı versin state güncellenmesin.
		},
	},
});

export const { addToCart, removeCartItem, updateCartItem } =
	CartReducer.actions;
export default CartReducer.reducer;
