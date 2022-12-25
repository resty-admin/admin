import { gql } from "apollo-angular";

export const HALLS_QUERY = gql`
	query getHalls($skip: Int!, $take: Int!) {
		halls(skip: $skip, take: $take) {
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
