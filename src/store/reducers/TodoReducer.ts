import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllTodos, getAllTodosById } from '../../services/TodoApi';

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export type TodoState = {
	data: Todo[]; // ekranda gösterilecek olan veri
	loading: boolean; // veri çekilme anı, veri çekilirken async olduğunda show loading göstermek için
	error: any;
	fetching: boolean; // veri çekiliyor
	fetched: boolean; // veri çekildi
	selected: Todo | null;
	apiSelected: Todo | null;
};

const initialState: TodoState = {
	data: [],
	loading: false,
	error: null,
	fetching: false,
	fetched: false,
	selected: null, // listeden tıklandığında seçilecek olan nesne
	apiSelected: null,
};

// Thunk middleware; asenkron kod bloklarını senkron hale getirip server state client state uygulayan ara middleware, ara yazılım katmanı görevi görür.
export const fetchTodos = createAsyncThunk('FETCHTODOS', async () => {
	return getAllTodos();
});

export const fetchTodoById = createAsyncThunk(
	'FETCHTODOSByID',
	async (id: number) => {
		return getAllTodosById(id);
	}
);

const TodoReducer = createSlice({
	name: 'TODO',
	initialState: initialState,
	reducers: {
		// todo state ile ilgili senkron actionlar
		// listeden bir item seçme işlemi yaptık.
		select: (state: TodoState, action: PayloadAction<Todo>) => {
			// prepend yapıp en üste ekleteceğim.
			state.selected = action.payload;
			// bir seçimde seçilen değerin güncel olup olmadığını kontrol etmek için apidan da bir çekelim.
		},
	},
	extraReducers(builder) {
		// asenkron kod blokları ile çalıştığımızda kullandığımız methodlar burada olacak
		// pending state => veri çekilirken, fullfilled => veri başarılı bir şekilde çekildiğinde, rejected state => veri çekilirken bir network hatası oluştuğu durumda kullanılan state
		builder.addCase(fetchTodos.pending, (state: TodoState) => {
			// bu case'ler async ifadeler otomatik olarak çalışır
			console.log('... pending');
			state.loading = true;
			state.fetching = true;
		});

		builder.addCase(fetchTodos.fulfilled, (state: TodoState, action: any) => {
			console.log('... fulfilled');
			state.loading = false;
			state.fetching = false;
			state.fetched = true;
			state.data = action.payload; // action payload değerinden veri gelecek
			state.error = null;
		});

		builder.addCase(fetchTodos.rejected, (state: TodoState) => {
			console.log('... rejected');
			state.loading = false;
			state.data = [];
			state.fetched = true;
			state.fetching = false;
			state.error = { message: 'Todos çekilirken bir hata oluştu' };
		});

		builder.addCase(fetchTodoById.pending, (state: TodoState) => {
			console.log('fetchTodoById pending');
		});

		builder.addCase(
			fetchTodoById.fulfilled,
			(state: TodoState, action: any) => {
				state.apiSelected = action.payload;
			}
		);

		builder.addCase(fetchTodoById.rejected, (state: TodoState, action: any) => {
			state.apiSelected = null;
		});
	},
});

export const { select } = TodoReducer.actions;

export default TodoReducer.reducer;
