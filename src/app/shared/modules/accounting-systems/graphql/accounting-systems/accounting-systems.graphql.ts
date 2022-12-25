import { gql } from "apollo-angular";

export const ACCOUNTING_SYSTEMS_QUERY = gql`
	query getAccountingSystems($skip: Int!, $take: Int!) {
		accountingSystems(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
