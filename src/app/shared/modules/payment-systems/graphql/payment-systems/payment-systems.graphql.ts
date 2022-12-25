import { gql } from "apollo-angular";

export const PAYMENT_SYSTEMS_QUERY = gql`
	query getPaymentSystems($skip: Int!, $take: Int!) {
		payments(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
