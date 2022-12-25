import { gql } from "apollo-angular";

export const PRODUCTS_QUERY = gql`
	query getProducts($skip: Int!, $take: Int!) {
		products(skip: $skip, take: $take) {
			data {
				id
				name
				price
				category {
					name
				}
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;
