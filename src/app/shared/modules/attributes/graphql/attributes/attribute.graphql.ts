import { gql } from "apollo-angular";

export const ATTRIBUTE_QUERY = gql`
	query getAttributes($skip: Int!, $take: Int!) {
		attributes(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
