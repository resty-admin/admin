import type { ProductEntity, ProductToOrderEntity, UserEntity } from "@graphql";

export interface IProductToOrder {
	paidStatus: ProductToOrderEntity["paidStatus"];
	user: {
		name: UserEntity["name"];
	};
	count: ProductToOrderEntity["count"];
	product: {
		name: ProductEntity["name"];
		price: ProductEntity["price"];
	};
}
