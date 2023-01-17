import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type OrderPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface OrderPageQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		id: string;
		type: Types.OrderTypeEnum;
		orderNumber: number;
		code: number;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		tableStatus: Types.TableStatusEnum;
		table?: {
			__typename?: "TableEntity";
			id: string;
			name: string;
			hall: { __typename?: "HallEntity"; id: string; name: string };
		} | null;
		productsToOrders?:
			| {
					__typename?: "ProductToOrderEntity";
					id: string;
					count: number;
					status: Types.ProductToOrderStatusEnum;
					paidStatus: Types.ProductToOrderPaidStatusEnum;
					product: {
						__typename?: "ProductEntity";
						id: string;
						name: string;
						description?: string | null;
						price: number;
						file?: { __typename?: "FileEntity"; id: string; url: string } | null;
						attrsGroups?:
							| {
									__typename?: "AttributesGroupEntity";
									id: string;
									name: string;
									attributes?: { __typename?: "AttributesEntity"; id: string; name: string }[] | null;
							  }[]
							| null;
					};
					user: { __typename?: "UserEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export const OrderPageDocument = gql`
	query OrderPage($orderId: String!) {
		order(id: $orderId) {
			id
			type
			orderNumber
			code
			status
			totalPrice
			tableStatus
			table {
				id
				name
				hall {
					id
					name
				}
			}
			productsToOrders {
				id
				count
				status
				paidStatus
				product {
					id
					name
					description
					price
					file {
						id
						url
					}
					attrsGroups {
						id
						name
						attributes {
							id
							name
						}
					}
				}
				user {
					id
					name
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class OrderPageGQL extends Apollo.Query<OrderPageQuery, OrderPageQueryVariables> {
	override document = OrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
