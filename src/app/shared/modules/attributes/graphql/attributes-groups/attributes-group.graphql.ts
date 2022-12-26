import { gql } from "apollo-angular";

export const ATTRIBUTES_GROUP_QUERY = gql`
	query getAttributesGroup($skip: Int!, $take: Int!) {
		attributesGroup(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
