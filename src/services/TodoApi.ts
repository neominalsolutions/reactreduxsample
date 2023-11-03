import axios from 'axios';

// api endpoint
// server state
export const getAllTodos = async () => {
	return (await axios.get('https://jsonplaceholder.typicode.com/todos')).data;
};

export const getAllTodosById = async (id: number) => {
	return (await axios.get('https://jsonplaceholder.typicode.com/todos/' + id))
		.data;
};
