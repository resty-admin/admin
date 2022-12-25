import { gql } from "apollo-angular";

export const USERS_QUERY = gql`
	query getUsers($skip: Int!, $take: Int!) {
		users(skip: $skip, take: $take) {
			data {
				id
				name
				role
				email
				tel
				password
			}
			totalCount
			page
		}
	}
`;
