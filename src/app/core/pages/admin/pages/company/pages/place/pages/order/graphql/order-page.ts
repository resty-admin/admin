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
		table?: { __typename?: "TableEntity"; id: string; name: string } | null;
		usersToOrders?:
			| {
					__typename?: "UserToOrderEntity";
					id: string;
					count: number;
					status: Types.ProductToOrderStatusEnum;
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
			table {
				id
				name
			}
			usersToOrders {
				id
				count
				status
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
