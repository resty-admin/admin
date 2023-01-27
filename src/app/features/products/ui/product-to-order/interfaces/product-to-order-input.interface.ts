import type { ProductEntity, ProductToOrderEntity, UserEntity } from "@graphql";

export interface IProductToOrderInput {
	id: ProductToOrderEntity["id"];
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
