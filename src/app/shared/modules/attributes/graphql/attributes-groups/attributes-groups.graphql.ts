import { gql } from "apollo-angular";

export const ATTRIBUTES_GROUPS_QUERY = gql`
	query getAttributesGroups($skip: Int!, $take: Int!, $filtersString: String) {
		attributesGroups(skip: $skip, take: $take, filtersString: $filtersString) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
