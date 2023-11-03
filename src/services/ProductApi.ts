import axios from 'axios';
import { Product } from '../pages/ProductsPage';

export const fetchProduct = async () => {
	return await axios
		.get<Product[]>(
			'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
		)
		.then((response: any) => response.data.value);
};

export const fetchProductById = async (id: number) => {
	return await axios
		.get<Product>(
			`https://services.odata.org/northwind/northwind.svc/Products?$filter=ProductID eq ${id}&$format=json`
		)
		.then((response: any) => response?.data?.value[0]);
};
