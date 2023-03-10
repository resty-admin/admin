import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type ActiveOrderPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ActiveOrderPageQuery {
	__typename?: "Query";
	order?: {
		__typename?: "ActiveOrderEntity";
		id: string;
		type: Types.OrderTypeEnum;
		orderNumber: number;
		code: number;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		startDate: any;
		comments?: string | null;
		users?: { __typename?: "UserEntity"; id: string; name: string }[] | null;
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
					attributesToProduct?:
						| {
								__typename?: "AttributeToProductEntity";
								id: string;
								attribute: { __typename?: "AttributesEntity"; id: string; name: string };
						  }[]
						| null;
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
	} | null;
}

export const ActiveOrderPageDocument = gql`
	query ActiveOrderPage($orderId: String!) {
		order(id: $orderId) {
			id
			type
			orderNumber
			code
			status
			totalPrice
			status
			startDate
			comments
			users {
				id
				name
			}
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
				attributesToProduct {
					id
					attribute {
						id
						name
					}
				}
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
export class ActiveOrderPageGQL extends Apollo.Query<ActiveOrderPageQuery, ActiveOrderPageQueryVariables> {
	override document = ActiveOrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
