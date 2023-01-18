import type { ProductToOrderEntity } from "../../../../../../graphql";
import type { ProductEntity, UserEntity } from "../../../../../../graphql";

export interface ISelectProductToOrder {
	id: ProductToOrderEntity["id"];
	status: ProductToOrderEntity["status"];
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