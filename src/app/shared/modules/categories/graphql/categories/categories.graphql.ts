import { gql } from "apollo-angular";

export const CATEGORIES_QUERY = gql`
	query getCategories($skip: Int!, $take: Int!, $filtersString: String) {
		categories(skip: $skip, take: $take, filtersString: $filtersString) {
			data {
				id
				name
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;
