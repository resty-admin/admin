import type { ProductEntity } from "@graphql";

export interface IProductForm {
	name: ProductEntity["name"];
	description: ProductEntity["description"];
	price: ProductEntity["price"];
	file?: ProductEntity["file"];
	category?: string;
	attrsGroups: ProductEntity["attrsGroups"];
}
