import { gql } from "apollo-angular";

export const COMPANIES_QUERY = gql`
	query getCompanies($skip: Int!, $take: Int!) {
		companies(skip: $skip, take: $take) {
			data {
				id
				name
				logo {
					url
				}
			}
			totalCount
			page
		}
	}
`;
