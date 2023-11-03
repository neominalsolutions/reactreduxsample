// react query ile geliştireceğiz

import React, { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { fetchProduct, fetchProductById } from '../services/ProductApi';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../store/store';
import { addToCart } from '../store/reducers/CartReducer';

export interface Product {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

function ProductsPage() {
	// useEffect hook ile veri çekme ihtiyacınız ortadan kalkıyor
	// component state ekrana bind etmek için useState de ihtiyaç yok;

	// products/detail/1

	// ProductId değerini state'e bağlayıp, id değeri değiştikçe ProductsById bozulacak ve yeniden apiden veri çekeceğiz.
	const [productId, setProductId] = useState<number>(1);

	const dispatch = useDispatch<RootDispatch>();

	const queryClient = new QueryClient();

	const selectedProductResponse = useQuery({
		queryKey: ['ProductsById', productId], // useEffect dependecy gibi düşünebiliriz, product değişiminde yeniden istek atılacak
		queryFn: async () => {
			return fetchProductById(productId);
		},
		onSuccess: (data: Product) => {
			console.log('apiden seçilen', data);
		},
	});

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

	const onAddToCart = (item: Product) => {
		// dispatch işlemi gerçekleştiririz.
		dispatch(
			addToCart({
				id: item.ProductID,
				name: item.ProductName,
				listPrice: item.UnitPrice,
			})
		);
	};

	if (productResponse.isLoading) return <>... loading</>;

	if (productResponse.error)
		return <>Veri çekerken bir hata oluştu tekrar deneyiniz</>;

	if (productResponse.data) {
		return (
			<>
				{selectedProductResponse.isFetched && (
					<>Seçilen : {(selectedProductResponse.data as Product).ProductName}</>
				)}

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
						return (
							<li key={item.ProductID}>
								{item.ProductName}
								<button
									onClick={() => {
										setProductId(item.ProductID); // productId state değiştirdiğimiz yer
									}}
								>
									Seç
								</button>
								<button
									onClick={() => {
										onAddToCart(item);
									}}
								>
									Sepete Ekle with Redux
								</button>
							</li>
						);
					})}
				</ul>
			</>
		);
	} else {
		return <></>;
	}
}

export default ProductsPage;
