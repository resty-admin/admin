import { gql } from "apollo-angular";

export const TABLES_QUERY = gql`
	query getTables($skip: Int!, $take: Int!) {
		tables(skip: $skip, take: $take) {
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
