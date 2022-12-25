import { gql } from "apollo-angular";

export const COMPANIES_AND_PLACES_QUERY = gql`
	query getCompaniesAndPlaces($skip: Int!, $take: Int!) {
		companies(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
		places(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
