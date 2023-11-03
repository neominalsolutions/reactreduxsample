import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../store/store';
import { CartItem, updateCartItem } from '../store/reducers/CartReducer';

type UpdateQuantityActionModel = {
	quantity: number;
	id: number;
};

function CartSummaryPage() {
	const cartState = useSelector((state: RootState) => state.cartState);
	const dispatch = useDispatch<RootDispatch>();

	const onUpdateQuantity = (data: UpdateQuantityActionModel) => {
		// cartItem güncelleme yapıp state'e yansıtacak.
		console.log('onUpdateQuantity', data);
		dispatch(updateCartItem({ quantity: data.quantity, id: data.id }));
	};

	return (
		<>
			{cartState.cart.items.map((item: CartItem) => {
				return (
					<div key={item.id}>
						{item.name}
						<input
							type="number"
							value={item.quantity}
							onChange={(e) => {
								const action: UpdateQuantityActionModel = {
									id: item.id,
									quantity: Number(e.target.value),
								};
								onUpdateQuantity(action);
							}}
						/>
					</div>
				);
			})}
		</>
	);
}

export default CartSummaryPage;
