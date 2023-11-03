// react query ile geliştireceğiz

import React, { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { fetchProduct } from '../services/ProductApi';

export interface Product {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

function ProductsPage() {
	// useEffect hook ile veri çekme ihtiyacınız ortadan kalkıyor
	// component state ekrana bind etmek için useState de ihtiyaç yok;

	const queryClient = new QueryClient();

	const productResponse = useQuery({
		queryKey: ['PRODUCTS'], // client state key, cache bozma işlemlerini bu key üzerinden yönetiriz
		// cacheTime: 3600000 // 1 saate cache default 5 dk cache
		// cacheTime: 0,
		queryFn: async () => {
			// createAsyncThunk çağırısının aynısını burada yapıyoruz
			return fetchProduct();
		},
		onSuccess: (data: Product[]) => {
			// modal aç toaster mesaj göster
			console.log('data', data);
		},
		onError: (err: any) => {
			console.log('err', err);
		}, // refetch pooling bir asenkron çağırının belirli zaman aralılarında otomatik olarak çağırılması
		// refetchInterval: 3000, // 3sn de bir tekrardan veri çek
	});

	if (productResponse.isLoading) return <>... loading</>;

	if (productResponse.error)
		return <>Veri çekerken bir hata oluştu tekrar deneyiniz</>;

	if (productResponse.data) {
		return (
			<>
				<hr></hr>
				<button onClick={() => productResponse.refetch()}>
					Manuel Refetch
				</button>
				<button
					onClick={() =>
						queryClient.invalidateQueries({ queryKey: ['PRODUCTS'] })
					}
				>
					Cahce Bozma Invalidated Etme
				</button>
				<ul>
					{productResponse.data.map((item: Product) => {
						return <li key={item.ProductID}>{item.ProductName}</li>;
					})}
				</ul>
			</>
		);
	} else {
		return <></>;
	}
}

export default ProductsPage;
