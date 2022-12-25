import { gql } from "apollo-angular";

export const CATEGORY_QUERY = gql`
	query getCategories($skip: Int!, $take: Int!) {
		categories(skip: $skip, take: $take) {
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
