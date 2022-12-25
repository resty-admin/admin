import { gql } from "apollo-angular";

export const PLACES_QUERY = gql`
	query getPlaces($skip: Int!, $take: Int!) {
		places(skip: $skip, take: $take) {
			data {
				id
				name
				address
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;
