import { gql } from "apollo-angular";

export const ATTRIBUTES_QUERY = gql`
	query getAttributes($skip: Int!, $take: Int!, $filtersString: String) {
		attributes(skip: $skip, take: $take, filtersString: $filtersString) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
