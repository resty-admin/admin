import { gql } from "apollo-angular";

export const ORDERS_QUERY = gql`
	query getOrders($skip: Int!, $take: Int!) {
		orders(skip: $skip, take: $take) {
			data {
				id
				orderCode
				status
			}
			totalCount
			page
		}
	}
`;
