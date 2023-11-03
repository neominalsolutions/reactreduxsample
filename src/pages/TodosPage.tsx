import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../store/store';
import {
	Todo,
	fetchTodoById,
	fetchTodos,
	select,
} from '../store/reducers/TodoReducer';

function TodosPage() {
	// useState kullanmadım çünkü veri hazır olarak redux üzerinden çekiliyor.

	const [number, setNumber] = useState<number>(0);
	const dispatch = useDispatch<RootDispatch>();
	const todoState = useSelector((state: RootState) => state.todo);
	// client state dönüşen server state değerini dinledik.

	useEffect(() => {
		// server state client state eşle.
		dispatch(fetchTodos()); // server state client state aktarılsın
	}, []);

	const onSelect = (selected: Todo) => {
		dispatch(select(selected));
		// apiden seçili olanın güncel değerini çek
		dispatch(fetchTodoById(selected.id));
		setNumber(number + 1);
	};

	// state içerisindeki datanın çekilme anını yakalama işlemleri yaptık
	if (todoState.loading && todoState.fetching) {
		return <>... loading</>;
	}

	// hata durumlarında ekran hata mesajı gösterdik
	if (todoState.error) return <>{todoState.error.message}</>;

	// datanın success olduğu durumda datayı ekrana getirdik.
	if (todoState.data.length > 0)
		return (
			<>
				Seçim İşlem Sayısı: {number}
				<br></br>
				Client State Seçilen : {todoState.selected?.title}
				<br></br>
				Api State Seçilen: {todoState.apiSelected?.title}
				<hr></hr>
				{todoState.data.map((item: Todo) => {
					return (
						<div key={item.id}>
							{item.title}{' '}
							<button onClick={() => onSelect(item)}>Seçim Yap</button>
							<button onClick={() => {

							}}>
							</button>
						</div>
					);
				})}
			</>
		);
	else return <></>;
}

export default TodosPage;
